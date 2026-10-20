import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

const BOOK_COLORS = ['#65745b', '#a58a6a', '#34352f', '#ddd2bf', '#4e5a46', '#8a6f52', '#7f8c73', '#c2b49c']

/**
 * Mounts a ring of floating books into `container`.
 * Returns a cleanup function. Throws if WebGL is unavailable.
 */
export function mountBookRing(container, { reducedMotion = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog('#f7f3ea', 10, 18)

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60)
  camera.position.set(0, 0.6, 10)

  // lights: warm key, cool rim, soft fill
  scene.add(new THREE.HemisphereLight('#fffaf0', '#cfc3ad', 1.3))
  const key = new THREE.DirectionalLight('#ffeccf', 2.4)
  key.position.set(4, 6, 6)
  scene.add(key)
  const rim = new THREE.PointLight('#cdbb9c', 30, 30)
  rim.position.set(-6, -1, -4)
  scene.add(rim)
  const glow = new THREE.PointLight('#e8d3ad', 10, 12)
  glow.position.set(0, 0.2, 0)
  scene.add(glow)

  // seeded random so the ring is the same on every visit
  let seed = 11
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)

  const ring = new THREE.Group()
  const tilt = new THREE.Group()
  tilt.add(ring)
  scene.add(tilt)

  const pageMat = new THREE.MeshStandardMaterial({ color: '#efe6d2', roughness: 0.9 })
  const coverMats = BOOK_COLORS.map(
    (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.42, metalness: 0.15 }),
  )
  const bandMat = new THREE.MeshStandardMaterial({ color: '#e9dcc3', roughness: 0.4, metalness: 0.2, emissive: '#5a4a35', emissiveIntensity: 0.3 })
  const geometries = []

  const books = []
  const COUNT = 30
  const R = 3.3
  for (let i = 0; i < COUNT; i++) {
    const a = (i / COUNT) * Math.PI * 2 + rnd() * 0.08
    const h = 1.05 + rnd() * 0.55
    const t = 0.2 + rnd() * 0.16
    const d = 0.82 + rnd() * 0.14

    const book = new THREE.Group()
    const coverGeo = new RoundedBoxGeometry(t, h, d, 3, 0.035)
    const pageGeo = new THREE.BoxGeometry(t * 0.8, h * 0.94, d * 0.97)
    const bandGeo = new THREE.BoxGeometry(t * 1.02, 0.03, 0.02)
    geometries.push(coverGeo, pageGeo, bandGeo)

    const cover = new THREE.Mesh(coverGeo, coverMats[Math.floor(rnd() * coverMats.length)])
    const pages = new THREE.Mesh(pageGeo, pageMat)
    pages.position.z = -d * 0.03 // fore-edge peeks out on the inner side
    book.add(cover, pages)
    // two gilt bands on the spine (+Z face)
    for (const y of [h * 0.36, -h * 0.36]) {
      const band = new THREE.Mesh(bandGeo, bandMat)
      band.position.set(0, y, d / 2 + 0.002)
      book.add(band)
    }

    const r = R + (rnd() - 0.5) * 0.35
    const y = (rnd() - 0.5) * 0.7
    book.position.set(Math.cos(a) * r, y, Math.sin(a) * r)
    book.lookAt(Math.cos(a) * r * 2, y, Math.sin(a) * r * 2) // spine faces outward
    book.rotateZ((rnd() - 0.5) * 0.35)
    book.userData = { baseY: y, phase: rnd() * Math.PI * 2, speed: 0.4 + rnd() * 0.5 }
    ring.add(book)
    books.push(book)
  }

  // drifting dust in the light
  const DUST = 260
  const dustPos = new Float32Array(DUST * 3)
  for (let i = 0; i < DUST; i++) {
    dustPos[i * 3] = (rnd() - 0.5) * 14
    dustPos[i * 3 + 1] = (rnd() - 0.5) * 8
    dustPos[i * 3 + 2] = (rnd() - 0.5) * 10
  }
  const dustGeo = new THREE.BufferGeometry()
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
  geometries.push(dustGeo)
  const dustMat = new THREE.PointsMaterial({
    color: '#a58a6a',
    size: 0.035,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  })
  const dust = new THREE.Points(dustGeo, dustMat)
  scene.add(dust)

  let ready = false
  // layout: ring sits to the right on wide screens, above the text on narrow ones
  let wide = true
  function resize() {
    const w = container.clientWidth
    const h = container.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    wide = w / h > 1.05
    if (wide) {
      const shift = Math.min(3.9, 2.2 + (w / h - 1) * 2.4)
      tilt.position.set(shift, 0.15, 0)
      tilt.scale.setScalar(0.74)
    } else {
      tilt.position.set(0, 2.55, 0)
      tilt.scale.setScalar(0.5)
    }
    glow.position.copy(tilt.position)
    if (reducedMotion && ready) render()
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(container)

  // pointer parallax
  const target = { x: 0, y: 0 }
  const current = { x: 0, y: 0 }
  function onPointer(e) {
    target.x = (e.clientX / window.innerWidth) * 2 - 1
    target.y = (e.clientY / window.innerHeight) * 2 - 1
  }
  if (!reducedMotion) window.addEventListener('pointermove', onPointer, { passive: true })

  tilt.rotation.set(0.32, 0, -0.12)

  let visible = true
  const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
  io.observe(container)

  const clock = new THREE.Clock()
  let frame
  function render() {
    const t = clock.getElapsedTime()
    current.x += (target.x - current.x) * 0.04
    current.y += (target.y - current.y) * 0.04
    ring.rotation.y = t * 0.12
    tilt.rotation.x = 0.32 + current.y * 0.12
    tilt.rotation.z = -0.12 - current.x * 0.08
    camera.position.x = current.x * 0.5
    camera.lookAt(0, wide ? 0.2 : 0.9, 0)
    for (const b of books) {
      const u = b.userData
      b.position.y = u.baseY + Math.sin(t * u.speed + u.phase) * 0.08
    }
    dust.rotation.y = t * 0.02
    dust.position.y = Math.sin(t * 0.2) * 0.15
    renderer.render(scene, camera)
  }
  function loop() {
    frame = requestAnimationFrame(loop)
    if (visible && !document.hidden) render()
  }

  ready = true
  if (reducedMotion) {
    render()
  } else {
    loop()
  }

  return () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('pointermove', onPointer)
    ro.disconnect()
    io.disconnect()
    geometries.forEach((g) => g.dispose())
    ;[pageMat, bandMat, dustMat, ...coverMats].forEach((m) => m.dispose())
    renderer.dispose()
    renderer.domElement.remove()
  }
}
