// R3F 9.x auto-registers its `JSX.IntrinsicElements` augmentation when this
// module is loaded. Keep the import for that side-effect even if no symbol
// from it is used at the top of the file.
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { AnatomyOrgan } from '@/content/types'
import { T } from '@/components/i18n/T'
import { ANATOMY_3D } from '@/lib/lessonExtrasStrings'

/**
 * 3D anatomy viewer used both inside the in-lesson 3D tab and on the
 * fullscreen `/anatomy/:subject/:slug` page.
 *
 * The component fills its parent — the parent decides the size:
 * - in-lesson tab: a fixed `h-[460px]` box (to coexist with other lesson
 *   chrome)
 * - fullscreen page: `h-screen w-screen` so the canvas is the entire page
 *
 * The camera fits the model's bounding sphere at load time so the organ
 * fills ~70% of the viewport height. `position3d` is normalised to the bbox
 * and converted to world space, so the author only ever writes a [0,1]
 * triple regardless of how big the GLB actually is.
 *
 * Optional `autoRotate` and `onAutoRotateChange` add an auto-rotate toggle
 * the fullscreen page shows; the in-lesson tab passes a fixed `false`.
 */
export function Anatomy3D({
  modelUrl,
  parts,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  followStep = -1,
  orderedForFollow = [],
  autoRotate = false,
  onAutoRotateChange,
}: {
  modelUrl: string
  parts: AnatomyOrgan[]
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  followStep?: number
  orderedForFollow?: AnatomyOrgan[]
  autoRotate?: boolean
  onAutoRotateChange?: (v: boolean) => void
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-canvas">
      <Canvas
        camera={{ position: [0, 0.4, 3.5], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        shadows={false}
      >
        {/* Three-point lighting: a soft ambient base, a warm key from the
            upper-right front, and a cool fill from the lower-left. Together
            they read every surface of a flesh-toned organ without the harsh
            contrast a single directional light would produce. */}
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 2]} intensity={1.1} color="#fff4e6" />
        <directionalLight position={[-3, -1, -2]} intensity={0.45} color="#dbeafe" />
        <directionalLight position={[0, 2, -3]} intensity={0.35} />

        <Suspense fallback={null}>
          <ModelWithHotspots
            modelUrl={modelUrl}
            parts={parts}
            selectedId={selectedId}
            hoveredId={hoveredId}
            onSelect={onSelect}
            onHover={onHover}
            followStep={followStep}
            orderedForFollow={orderedForFollow}
            autoRotate={autoRotate}
          />
        </Suspense>

        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          minDistance={0.5}
          maxDistance={20}
          target={[0, 0, 0]}
          makeDefault
        />
      </Canvas>

      {/* Top-right control — auto-rotate toggle. Only shown when the parent
          passes a setter (the fullscreen page does, the in-lesson tab does
          not, because there the page chrome already competes for attention). */}
      {onAutoRotateChange && (
        <button
          type="button"
          onClick={() => onAutoRotateChange(!autoRotate)}
          aria-pressed={autoRotate}
          className={
            'absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm transition-colors ' +
            (autoRotate
              ? 'border-accent bg-accent text-white'
              : 'border-line bg-canvas/90 text-ink-soft hover:bg-surface')
          }
        >
          <span aria-hidden="true">{autoRotate ? '⏸' : '↻'}</span>
          <span>{autoRotate ? ANATOMY_3D.pauseRotate.en : ANATOMY_3D.startRotate.en}</span>
        </button>
      )}

      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-canvas/85 px-3 py-1 text-[11px] text-ink-soft shadow-sm backdrop-blur">
        <T value={ANATOMY_3D.dragHint} />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Internal: load the GLB, compute the bbox once, render the model + pins.
// ---------------------------------------------------------------------------

function ModelWithHotspots({
  modelUrl,
  parts,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  followStep,
  orderedForFollow,
  autoRotate,
}: {
  modelUrl: string
  parts: AnatomyOrgan[]
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  followStep: number
  orderedForFollow: AnatomyOrgan[]
  autoRotate: boolean
}) {
  const gltf = useGLTF(modelUrl)
  const scene = useMemo(() => gltf.scene.clone(true), [gltf])

  // Bounding box + bounding sphere. We use the sphere for camera fit (it
  // gives a perfectly-fitted view from any angle) and the box for hotspot
  // coordinate conversion.
  const bbox = useMemo(() => new THREE.Box3().setFromObject(scene), [scene])
  const sphere = useMemo(() => {
    const s = new THREE.Sphere()
    bbox.getBoundingSphere(s)
    return s
  }, [bbox])
  const { center, sphereRadius } = useMemo(
    () => ({ center: sphere.center, sphereRadius: sphere.radius || 1 }),
    [sphere]
  )

  // Normalisation: scale the model so its bounding-sphere radius is 1. The
  // camera then sits at `1 / tan(fov/2)` units away, which makes the model
  // fill the viewport height. A small multiplier leaves breathing room.
  const scale = useMemo(() => 1 / sphereRadius, [sphereRadius])
  useEffect(() => {
    scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale)
  }, [scene, center, scale])

  // Fit the camera to the now-scaled sphere. Sphere radius is 1 in world
  // units after the scale above; the camera is placed on the +Z axis at the
  // distance that just barely contains the sphere, with a 1.4× margin so
  // the model has air around it.
  const { camera, size } = useThree()
  useEffect(() => {
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180)
    const fitDist = 1 / Math.tan(fov / 2)
    // 1.4 = ~70% of viewport height; tune up for "tighter", down for "looser"
    const dist = fitDist * 1.4
    camera.position.set(0, 0.2, dist)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [camera, size.width, size.height])

  // Auto-rotate: spin the scene about Y. OrbitControls ignores a model-
  // level rotation, so this is the only thing moving the model itself
  // when the user is hands-off. Mutating `scene.rotation` is the right way
  // to turn a 3D object; react-hooks/immutability flags it but the
  // mutation is intentional.
  /* eslint-disable react-hooks/immutability -- Three.js Object3D rotation is the public API for animation */
  useFrame((_, dt) => {
    if (autoRotate) {
      scene.rotation.y += dt * 0.35
    }
  })
  /* eslint-enable react-hooks/immutability */

  // Filter to parts that actually have a 3D position.
  const partsWithPos = useMemo(() => parts.filter((p) => p.position3d), [parts])

  // Resolve which part is being "followed" right now.
  const followTarget = orderedForFollow[Math.min(Math.max(0, followStep), Math.max(0, orderedForFollow.length - 1))]
  const followPos3d = followTarget?.position3d

  return (
    <>
      <primitive object={scene} scale={scale} />

      {partsWithPos.map((p) => {
        const pos = p.position3d!
        // Convert [0,1] bbox coords to world space (after our centre+scale).
        const localX = (pos[0] - 0.5) * (sphereRadius * 2) + center.x
        const localY = (pos[1] - 0.5) * (sphereRadius * 2) + center.y
        const localZ = (pos[2] - 0.5) * (sphereRadius * 2) + center.z
        // Then apply our normalisation (which subtracts center then multiplies
        // by scale), so the pin ends up at the same world point as the model
        // surface it represents.
        const worldX = (localX - center.x) * scale
        const worldY = (localY - center.y) * scale
        const worldZ = (localZ - center.z) * scale
        const isSelected = selectedId === p.id
        const isHovered = hoveredId === p.id
        const showRing = isSelected || isHovered
        return (
          <Html
            key={p.id}
            position={[worldX, worldY, worldZ]}
            center
            distanceFactor={4}
            zIndexRange={[40, 0]}
            style={{ pointerEvents: 'auto' }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onSelect(p.id)
              }}
              onMouseEnter={() => onHover(p.id)}
              onMouseLeave={() => onHover(null)}
              data-3d-hotspot={p.id}
              className="block rounded-full transition-transform"
              style={{
                width: showRing ? 28 : 22,
                height: showRing ? 28 : 22,
                background: isSelected ? '#0d9488' : isHovered ? '#0f172a' : '#0f172a99',
                border: '2px solid white',
                boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
                cursor: 'pointer',
                padding: 0,
              }}
              aria-label={p.name.en}
            />
          </Html>
        )
      })}

      {followPos3d && (
        <FollowDot3D
          position={followPos3d}
          center={center}
          sphereRadius={sphereRadius}
          scale={scale}
        />
      )}
    </>
  )
}

function FollowDot3D({
  position,
  center,
  sphereRadius,
  scale,
}: {
  position: [number, number, number]
  center: THREE.Vector3
  sphereRadius: number
  scale: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const localX = (position[0] - 0.5) * (sphereRadius * 2) + center.x
  const localY = (position[1] - 0.5) * (sphereRadius * 2) + center.y
  const localZ = (position[2] - 0.5) * (sphereRadius * 2) + center.z
  const worldX = (localX - center.x) * scale
  const worldY = (localY - center.y) * scale
  const worldZ = (localZ - center.z) * scale

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime()
      const s = 1 + 0.3 * Math.sin(t * 4)
      ref.current.scale.setScalar(s * 0.05)
    }
  })

  return (
    <mesh ref={ref} position={[worldX, worldY, worldZ]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#dc2626" />
    </mesh>
  )
}
