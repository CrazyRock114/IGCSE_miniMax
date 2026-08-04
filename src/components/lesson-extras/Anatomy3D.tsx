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
 * The 3D counterpart of the 2D `Anatomy` hotspots pattern. Loads a `.glb`
 * model, fits the camera to its bounding box, and renders each `AnatomyOrgan`
 * that has a `position3d` as a clickable `<Html>` pin floating at the
 * corresponding 3D point.
 *
 * The same `parts` data shape drives the 2D and 3D renderers in
 * `HeartAnatomy` — only the `position3d` field is 3D-specific. Adding the
 * field is the only change needed in the lesson to enable a 3D tab.
 *
 * Coordinates: `position3d` is a `[x, y, z]` triple in the model-local
 * bounding-box unit cube — 0 is the bbox minimum, 1 the maximum on each axis.
 * We compute the model bbox once at load time and convert per-frame, so the
 * author never has to know the model's actual size.
 */
export function Anatomy3D({
  modelUrl,
  parts,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  followStep,
  orderedForFollow,
}: {
  modelUrl: string
  parts: AnatomyOrgan[]
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  followStep: number
  orderedForFollow: AnatomyOrgan[]
}) {
  return (
    <div className="relative h-[460px] w-full overflow-hidden rounded-lg border border-line bg-canvas">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        shadows={false}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[2, 2, 3]} intensity={0.9} />
        <directionalLight position={[-2, -1, -2]} intensity={0.4} />

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
          />
        </Suspense>

        <OrbitControls
          enableDamping
          dampingFactor={0.12}
          minDistance={0.5}
          maxDistance={12}
          makeDefault
        />
      </Canvas>

      <div className="pointer-events-none absolute bottom-2 right-2 rounded bg-canvas/80 px-2 py-1 text-[10px] text-muted">
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
}: {
  modelUrl: string
  parts: AnatomyOrgan[]
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  followStep: number
  orderedForFollow: AnatomyOrgan[]
}) {
  const gltf = useGLTF(modelUrl)
  const scene = useMemo(() => gltf.scene.clone(true), [gltf])

  // Bounding box + fit-once camera.
  const bbox = useMemo(() => new THREE.Box3().setFromObject(scene), [scene])
  const { center, maxDim } = useMemo(() => {
    const s = new THREE.Vector3()
    const c = new THREE.Vector3()
    bbox.getSize(s)
    bbox.getCenter(c)
    return { center: c, maxDim: Math.max(s.x, s.y, s.z) || 1 }
  }, [bbox])

  useEffect(() => {
    scene.position.set(0, 0, 0)
  }, [scene, maxDim])

  // Fit the camera once when the bbox is known.
  const { camera } = useThree()
  useEffect(() => {
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180)
    // After our 1.5/maxDim scale, maxDim becomes 1.5 in world units.
    const camDist = 1.5 / (2 * Math.tan(fov / 2)) * 1.6
    camera.position.set(0, 0, camDist)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [camera, maxDim])

  // Filter to parts that actually have a 3D position.
  const partsWithPos = useMemo(() => parts.filter((p) => p.position3d), [parts])

  // Resolve which part is being "followed" right now.
  const followTarget = orderedForFollow[Math.min(followStep, Math.max(0, orderedForFollow.length - 1))]
  const followPos3d = followTarget?.position3d

  return (
    <>
      <primitive object={scene} scale={1.5 / maxDim} />

      {partsWithPos.map((p) => {
        const pos = p.position3d!
        // Convert [0,1] bbox coords to world space (after our scale).
        const worldX = (pos[0] - 0.5) * 1.5 + center.x * (1.5 / maxDim)
        const worldY = (pos[1] - 0.5) * 1.5 + center.y * (1.5 / maxDim)
        const worldZ = (pos[2] - 0.5) * 1.5 + center.z * (1.5 / maxDim)
        const isSelected = selectedId === p.id
        const isHovered = hoveredId === p.id
        const showRing = isSelected || isHovered
        return (
          <Html
            key={p.id}
            position={[worldX, worldY, worldZ]}
            center
            distanceFactor={6}
            zIndexRange={[20, 0]}
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
                width: showRing ? 22 : 16,
                height: showRing ? 22 : 16,
                background: isSelected ? '#0d9488' : isHovered ? '#0f172a' : '#0f172a99',
                border: '2px solid white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
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
          maxDim={maxDim}
        />
      )}
    </>
  )
}

function FollowDot3D({
  position,
  center,
  maxDim,
}: {
  position: [number, number, number]
  center: THREE.Vector3
  maxDim: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const worldX = (position[0] - 0.5) * 1.5 + center.x * (1.5 / maxDim)
  const worldY = (position[1] - 0.5) * 1.5 + center.y * (1.5 / maxDim)
  const worldZ = (position[2] - 0.5) * 1.5 + center.z * (1.5 / maxDim)

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime()
      const s = 1 + 0.25 * Math.sin(t * 4)
      ref.current.scale.setScalar(s)
    }
  })

  return (
    <mesh ref={ref} position={[worldX, worldY, worldZ]}>
      <sphereGeometry args={[0.04, 16, 16]} />
      <meshBasicMaterial color="#dc2626" />
    </mesh>
  )
}
