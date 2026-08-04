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
 * The container fills its parent — the parent decides the size:
 * - in-lesson tab: an `aspect-[951/564] w-full` box (matches the 2D figure's
 *   visual height on the same page)
 * - fullscreen page: `h-screen w-screen` so the canvas is the entire page
 *
 * The camera fits the model's bounding sphere at load time so the organ
 * fills ~70% of the viewport height. `position3d` is normalised to the bbox
 * and converted to world space, so the author only ever writes a [0,1]
 * triple regardless of how big the GLB actually is.
 *
 * Optional `autoRotate` and `onAutoRotateChange` add an auto-rotate toggle
 * the fullscreen page shows; the in-lesson tab passes a fixed `false`.
 *
 * `onSelectedScreenPos` reports the screen position of the currently
 * selected part every frame, so the parent page can draw a leader line
 * from the floating callout to the dot in the model. Set to `undefined`
 * when no part is selected.
 *
 * `pinOverrides` lets the parent replace the lesson's `position3d` for
 * any part — the viewer uses the override if present, otherwise the
 * lesson value. Used by the Edit Mode panel on the fullscreen page: the
 * student nudges a slider and the dot moves in real time without a
 * rebuild.
 *
 * `editMode` swaps the click handler: instead of selecting a part it
 * reports `onPinAdjust` so the parent can drop that part into the
 * editor panel.
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
  onSelectedScreenPos,
  pinOverrides,
  editMode = false,
  onPinAdjust,
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
  onAutoRotateChange?: ((v: boolean) => void) | undefined
  onSelectedScreenPos?: ((pos: { x: number; y: number } | null) => void) | undefined
  pinOverrides?: Record<string, [number, number, number]> | undefined
  editMode?: boolean | undefined
  onPinAdjust?: ((id: string) => void) | undefined
}) {
  return (
    <div className="relative aspect-[951/564] w-full overflow-hidden bg-canvas">
      <Canvas
        camera={{ position: [0, 0.4, 3.5], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        shadows={false}
      >
        {/* Four-light setup: hemisphere (sky/ground ambient) + ambient base
            + warm key (upper-right front) + cool fill (lower-left) + cool
            rim (back). Brighter than a textbook diagram because the page
            background is off-white — a 1.0 default reads as muddy by
            comparison. */}
        <hemisphereLight args={['#fff4e6', '#dbeafe', 0.6]} />
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 2]} intensity={1.8} color="#fff4e6" />
        <directionalLight position={[-3, -1, -2]} intensity={0.85} color="#dbeafe" />
        <directionalLight position={[0, 2, -3]} intensity={0.7} />

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
            onSelectedScreenPos={onSelectedScreenPos}
            pinOverrides={pinOverrides}
            editMode={editMode}
            onPinAdjust={onPinAdjust}
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

      {/* Top-LEFT control — auto-rotate toggle. Top-left so the right edge
          stays clear for the fullscreen page's List / Reset / Copy / Edit
          stack. Only shown when the parent passes a setter. */}
      {onAutoRotateChange && (
        <button
          type="button"
          onClick={() => onAutoRotateChange(!autoRotate)}
          aria-pressed={autoRotate}
          className={
            'absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm transition-colors ' +
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
  onSelectedScreenPos,
  pinOverrides,
  editMode,
  onPinAdjust,
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
  onSelectedScreenPos?: ((pos: { x: number; y: number } | null) => void) | undefined
  pinOverrides?: Record<string, [number, number, number]> | undefined
  editMode?: boolean | undefined
  onPinAdjust?: ((id: string) => void) | undefined
}) {
  const gltf = useGLTF(modelUrl)
  const scene = useMemo(() => gltf.scene.clone(true), [gltf])
  const groupRef = useRef<THREE.Group>(null)

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

  // Resolve the effective [0,1] position for each part: lesson value
  // unless an override is present. Pinned to a memo over both, so the
  // edit-mode panel can drive live movement without a re-derivation.
  // Collapse the override map to a primitive key so the dep array stays
  // a list of plain expressions (react-hooks/exhaustive-deps).
  const overrideKeys = pinOverrides ? Object.keys(pinOverrides).sort().join('|') : ''
  const pinsWithPos = useMemo(
    () =>
      parts
        .filter((p) => p.position3d || pinOverrides?.[p.id])
        .map((p) => {
          const pos = pinOverrides?.[p.id] ?? p.position3d!
          // Convert [0,1] bbox coords to world space (after our centre+scale).
          const localX = (pos[0] - 0.5) * (sphereRadius * 2) + center.x
          const localY = (pos[1] - 0.5) * (sphereRadius * 2) + center.y
          const localZ = (pos[2] - 0.5) * (sphereRadius * 2) + center.z
          return {
            id: p.id,
            name: p.name,
            worldPos: new THREE.Vector3(
              (localX - center.x) * scale,
              (localY - center.y) * scale,
              (localZ - center.z) * scale
            ) as THREE.Vector3,
          }
        }),
    // `overrideKeys` is the only piece of `pinOverrides` that matters for
    // recomputation: the values themselves are read inside the body.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [parts, center, sphereRadius, scale, overrideKeys]
  )

  // Auto-rotate: spin the *group* (not the scene) about Y. Pins are
  // children of the same group, so they rotate with the model.
  useFrame((_, dt) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += dt * 0.35
    }

    // Report the selected part's screen position to the parent (used by
    // the fullscreen page to draw a leader line from the callout to the
    // dot). Skipped if the part is behind the camera or out of the viewport.
    if (onSelectedScreenPos) {
      if (!selectedId) {
        onSelectedScreenPos(null)
      } else {
        const pin = pinsWithPos.find((p) => p.id === selectedId)
        if (!pin) {
          onSelectedScreenPos(null)
        } else {
          // World point = group rotation * pin world position
          const worldPoint = pin.worldPos.clone()
          if (groupRef.current) worldPoint.applyMatrix4(groupRef.current.matrixWorld)
          // Project to NDC, then to canvas pixels
          const ndc = worldPoint.clone().project(camera as THREE.PerspectiveCamera)
          if (ndc.z > 1 || ndc.z < -1) {
            onSelectedScreenPos(null)
          } else {
            onSelectedScreenPos({
              x: (ndc.x * 0.5 + 0.5) * size.width,
              y: (-ndc.y * 0.5 + 0.5) * size.height,
            })
          }
        }
      }
    }
  })

  // Filter to parts that actually have a 3D position (lesson or override).
  const partsWithPos = useMemo(
    () => parts.filter((p) => p.position3d || pinOverrides?.[p.id]),
    [parts, pinOverrides]
  )

  // Resolve which part is being "followed" right now.
  const followTarget = orderedForFollow[Math.min(Math.max(0, followStep), Math.max(0, orderedForFollow.length - 1))]
  const followPos3d = followTarget?.position3d

  return (
    <group
      ref={groupRef}
      scale={scale}
      // Recentre the model on the origin so auto-rotate spins around its
      // visual centre, not its GLB-local centre.
      position={[-center.x * scale, -center.y * scale, -center.z * scale]}
    >
      <primitive object={scene} />

      {partsWithPos.map((p) => {
        const isSelected = selectedId === p.id
        const isHovered = hoveredId === p.id
        const isAdjusted = Boolean(pinOverrides?.[p.id])
        const showRing = isSelected || isHovered
        // In edit mode every pin should be obviously pickable: same size,
        // slightly stronger ring, and an outline ring on the one being
        // adjusted to remind the user that an override is in place.
        const size = editMode ? 14 : showRing ? 16 : 12
        return (
          <Html
            key={p.id}
            position={pinsWithPos.find((q) => q.id === p.id)?.worldPos.toArray() ?? [0, 0, 0]}
            center
            distanceFactor={5}
            zIndexRange={[40, 0]}
            style={{ pointerEvents: 'auto' }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                if (editMode && onPinAdjust) onPinAdjust(p.id)
                else onSelect(p.id)
              }}
              onMouseEnter={() => onHover(p.id)}
              onMouseLeave={() => onHover(null)}
              data-3d-hotspot={p.id}
              data-pin-adjusted={isAdjusted ? 'true' : undefined}
              className="block rounded-full transition-transform"
              style={{
                width: size,
                height: size,
                background: isSelected ? '#0d9488' : isHovered ? '#0f172a' : '#0f172acc',
                border: isAdjusted ? '2px solid #f59e0b' : '1.5px solid white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
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
    </group>
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
      ref.current.scale.setScalar(s * 0.04)
    }
  })

  return (
    <mesh ref={ref} position={[worldX, worldY, worldZ]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#dc2626" />
    </mesh>
  )
}
