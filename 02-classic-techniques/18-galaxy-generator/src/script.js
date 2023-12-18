import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI({
    width: 300,
    title: 'Debug UI',
    closeFolders: false,
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Test cube
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube)

/*
 * Galaxy 
 */
const parameters = {
    count: 10000,
    size: 0.01,
    radius: 5,
    branches: 3,
    spin: 1,
    speed: 0.1,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984'
}

let geometry = null
let material = null
let points = null
// let speed = 0

const generateGalaxy = () => {

    if (points !== null) {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    /*
    * Geometry 
    */
    geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)

    const insideColor = new THREE.Color(parameters.insideColor)
    const outsideColor = new THREE.Color(parameters.outsideColor)
    
    /*
    * Material
    */
   material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
    })

    /*
    * Points
    */
   points = new THREE.Points(geometry, material)

    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3

        // Position
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < .5 ? 1 : -1)
        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < .5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < .5 ? 1 : -1)
        
        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = 0 + randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ
        
        // Color
        const mixedColor = insideColor.clone()
        mixedColor.lerp(outsideColor, Math.pow(radius / parameters.radius, 2))

        colors[i3    ] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }
    
    geometry.setAttribute(
        'position', 
        new THREE.BufferAttribute(positions, 3)
    )
    
    geometry.setAttribute(
        'color', 
        new THREE.BufferAttribute(colors, 3)
    )

    scene.add(points)
}
generateGalaxy()

gui.add(parameters, 'count').min(100).max(100000).step(100).onFinishChange(generateGalaxy)
gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'radius').min(.01).max(20).step(.01).onFinishChange(generateGalaxy)
gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
gui.add(parameters, 'spin').min(-5).max(5).step(.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'speed').min(-5).max(5).step(.01)
gui.add(parameters, 'randomness').min(0).max(2).step(.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomnessPower').min(1).max(10).step(.001).onFinishChange(generateGalaxy)
gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)

/**
 * Sizes
*/
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update Galaxy
    points.rotation.y = elapsedTime * parameters.speed


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()