import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Models
 */
// const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
// gltfLoader.setDRACOLoader(dracoLoader)

let model = null

gltfLoader.load(
    '/models/Duck/glTF-Binary/Duck.glb', (gltf) => {
        model = gltf.scene
        model.scale.set(5, 5, 5)
        model.position.z = -5.5
        model.position.y = -3
        model.rotation.y = Math.PI * 1.45
    scene.add(model)
    }
)

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, .5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
 * Mouse
 */
const mouse = new THREE.Vector2()

window.addEventListener('mousemove',(e) => {
    mouse.x = e.clientX / sizes.width * 2 - 1
    mouse.y = - (e.clientY / sizes.height * 2 - 1)
})

window.addEventListener('click', () =>  {
    if(currentIntersect) {
        switch(currentIntersect.object) {
            case object1:
                console.log('click on object1')
                break
            case object2:
                console.log('click on object2')
                break
            case object3:
                console.log('click on object3')
                break
        }
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
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

let currentIntersect = null

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate Objects
    object1.position.y = Math.sin(elapsedTime * .35) * 1.5
    object2.position.y = Math.sin(elapsedTime * .8) * 1.5
    object3.position.y = Math.sin(elapsedTime * 1.25) * 1.5

    // // Update raycaster
    // const rayOrigin = new THREE.Vector3(-3, 0, 0)
    // const rayDirection = new THREE.Vector3(1, 0, 0)
    // rayDirection.normalize()

    // raycaster.set(rayOrigin, rayDirection)
    raycaster.setFromCamera(mouse, camera)

    const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest)

    // if object not intersected with ray
    for (const object of objectsToTest) {
        object.material.color.set('#ff0000')
    }
    // if object intersected with ray
    for (const intersect of intersects) {
        intersect.object.material.color.set('#0000ff')
    }

    if (intersects.length) {
        if(!currentIntersect) {
            console.log('mouse enter')
        }
        currentIntersect = intersects[0]
    } else {
        if(currentIntersect) {
            console.log('mouse leave')
        }
        currentIntersect = null
    }

    if(model) {

        const modelIntersects = raycaster.intersectObject(model)
            // big duck on mouseover
            if(modelIntersects.length) {
                model.scale.set(5, 5, 5)
                model.position.y = -6
            } else {
                model.scale.set(1, 1, 1)
                model.position.y = -3
            }
    }


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()