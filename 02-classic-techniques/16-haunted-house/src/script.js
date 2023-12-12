import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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

// Fog
const fog = new THREE.Fog('#262837', 1, 15)

scene.fog = fog

/**
 * Textures
*/
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
bricksColorTexture.colorSpace = THREE.SRGBColorSpace
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')
// const bricksHeightTexture = textureLoader.load('/textures/bricks/height.png')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
grassColorTexture.colorSpace = THREE.SRGBColorSpace
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

const roofColorTexture = textureLoader.load('/textures/roof/baseColor.jpg')
roofColorTexture.colorSpace = THREE.SRGBColorSpace
const roofAmbientOcclusionTexture = textureLoader.load('/textures/roof/ambientOcclusion.jpg')
const roofNormalTexture = textureLoader.load('/textures/roof/normal.jpg')
const roofRoughnessTexture = textureLoader.load('/textures/roof/roughness.jpg')
const roofHeightTexture = textureLoader.load('/textures/roof/height.png')

const bushColorTexture = textureLoader.load('/textures/bush/baseColor.jpg')
bushColorTexture.colorSpace = THREE.SRGBColorSpace
const bushAmbientOcclusionTexture = textureLoader.load('/textures/bush/ambientOcclusion.jpg')
const bushNormalTexture = textureLoader.load('/textures/bush/normal.jpg')
const bushRoughnessTexture = textureLoader.load('/textures/bush/roughness.jpg')
// const bushHeightTexture = textureLoader.load('/textures/bush/height.png')

const gravesColorTexture = textureLoader.load('/textures/graves/baseColor.jpg')
gravesColorTexture.colorSpace = THREE.SRGBColorSpace
const gravesAmbientOcclusionTexture = textureLoader.load('/textures/graves/ambientOcclusion.jpg')
const gravesNormalTexture = textureLoader.load('/textures/graves/normal.jpg')
const gravesRoughnessTexture = textureLoader.load('/textures/graves/roughness.jpg')
// const gravesHeightTexture = textureLoader.load('/textures/graves/height.png')

const fasciaColorTexture = textureLoader.load('/textures/fascia/color.jpg')
fasciaColorTexture.colorSpace = THREE.SRGBColorSpace
const fasciaAmbientOcclusionTexture = textureLoader.load('/textures/fascia/ambientOcclusion.jpg')
const fasciaNormalTexture = textureLoader.load('/textures/fascia/normal.jpg')
const fasciaRoughnessTexture = textureLoader.load('/textures/fascia/roughness.jpg')
// const fasciaHeightTexture = textureLoader.load('/textures/fascia/height.png')

const glassColorTexture = textureLoader.load('/textures/glass/color.jpg')
glassColorTexture.colorSpace = THREE.SRGBColorSpace
const glassAmbientOcclusionTexture = textureLoader.load('/textures/glass/ambientOcclusion.jpg')
const glassNormalTexture = textureLoader.load('/textures/glass/normal.jpg')
const glassRoughnessTexture = textureLoader.load('/textures/glass/roughness.jpg')
// const glassHeightTexture = textureLoader.load('/textures/glass/height.png')


grassColorTexture.repeat.set(20, 20)
grassAmbientOcclusionTexture.repeat.set(20, 20)
grassNormalTexture.repeat.set(20, 20)
grassRoughnessTexture.repeat.set(20, 20)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

roofColorTexture.repeat.set(12, 2)
roofAmbientOcclusionTexture.repeat.set(12, 2)
roofNormalTexture.repeat.set(12, 2)
roofRoughnessTexture.repeat.set(12, 2)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping
roofRoughnessTexture.wrapS = THREE.RepeatWrapping

roofColorTexture.wrapT = THREE.RepeatWrapping
roofAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
roofNormalTexture.wrapT = THREE.RepeatWrapping
roofRoughnessTexture.wrapT = THREE.RepeatWrapping

fasciaColorTexture.repeat.set(1, .05)
fasciaAmbientOcclusionTexture.repeat.set(1, .05)
fasciaNormalTexture.repeat.set(1, .05)
fasciaRoughnessTexture.repeat.set(1, .05)

fasciaColorTexture.wrapS = THREE.RepeatWrapping
fasciaAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
fasciaNormalTexture.wrapS = THREE.RepeatWrapping
fasciaRoughnessTexture.wrapS = THREE.RepeatWrapping

fasciaColorTexture.wrapT = THREE.RepeatWrapping
fasciaAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
fasciaNormalTexture.wrapT = THREE.RepeatWrapping
fasciaRoughnessTexture.wrapT = THREE.RepeatWrapping

glassColorTexture.repeat.set(1, 1)
glassAmbientOcclusionTexture.repeat.set(1, 1)
glassNormalTexture.repeat.set(1, 1)
glassRoughnessTexture.repeat.set(1, 1)

/**
 * House
*/
// Group
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture,
        // displacementMap: bricksHeightTexture,
        // displacementScale: .1,
    })

)
walls.position.y = 2.5 / 2
walls.castShadow = true
walls.receiveShadow = true
house.add(walls)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.3, 1, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofAmbientOcclusionTexture,
        normalMap: roofNormalTexture,
        roughnessMap: roofRoughnessTexture,
        // displacementMap: roofHeightTexture,
        // displacementScale: 0.1,
    })
)
roof.position.y = 2.5 + 0.5
roof.rotation.y = Math.PI * .25
house.add(roof)

// Fascia
const fascia = new THREE.Mesh(
    new THREE.BoxGeometry(4.6, .2, 4.6),
    new THREE.MeshStandardMaterial({
        map: fasciaColorTexture,
        aoMap: fasciaAmbientOcclusionTexture,
        normalMap: fasciaNormalTexture,
        roughnessMap: fasciaRoughnessTexture,
        // displacementMap: fasciaHeightTexture,
        // displacementScale: 0.1,
    })
)
fascia.position.y = 2.3 + .1
house.add(fascia)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        alphaMap: doorAlphaTexture,
        transparent: true,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
    })
)
door.position.x = - .9
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

// Windows
const windows = new THREE.Group()
house.add(windows)

const window1 = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    new THREE.MeshStandardMaterial({
        map: glassColorTexture,
        aoMap: glassAmbientOcclusionTexture,
        normalMap: glassNormalTexture,
        roughnessMap: glassRoughnessTexture,
        // displacementMap: glassHeightTexture,
        // displacementScale: 0.1,
    })
)
window1.receiveShadow = true
window1.position.x = 1
window1.position.y = 1.2
window1.position.z = 2 + 0.01

const window2 = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    new THREE.MeshStandardMaterial({
        map: glassColorTexture,
        aoMap: glassAmbientOcclusionTexture,
        normalMap: glassNormalTexture,
        roughnessMap: glassRoughnessTexture,
        // displacementMap: glassHeightTexture,
        // displacementScale: 0.1,
    })
)
window2.receiveShadow = true
window2.position.x = -.8
window2.position.y = 1.2
window2.position.z = -2 - 0.01
window2.rotation.y = Math.PI

windows.add(window1, window2)

// Frames
const frameMaterial = new THREE.MeshStandardMaterial({
    map: fasciaColorTexture,
    aoMap: fasciaAmbientOcclusionTexture,
    normalMap: fasciaNormalTexture,
    roughnessMap: fasciaRoughnessTexture,
    // displacementMap: fasciaHeightTexture,
    // displacementScale: 0.1,
})

const sill1 = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, .1, .1),
    frameMaterial
)
sill1.castShadow = true
sill1.receiveShadow = true
sill1.position.x = 1
sill1.position.y = .8
sill1.position.z = 2 + 0.025

const sill2 = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, .1, .1),
    frameMaterial
)
sill2.castShadow = true
sill2.receiveShadow = true
sill2.position.x = -.8
sill2.position.y = .8
sill2.position.z = -2 - 0.025

const frameTop1 = new THREE.Mesh(
    new THREE.BoxGeometry(1.05, .1, .1),
    frameMaterial
)
frameTop1.castShadow = true
frameTop1.receiveShadow = true
frameTop1.position.x = 1
frameTop1.position.y = 1.7
frameTop1.position.z = 1.95 + 0.025

const frameTop2 = new THREE.Mesh(
    new THREE.BoxGeometry(1.05, .1, .1),
    frameMaterial
)
frameTop2.castShadow = true
frameTop2.receiveShadow = true
frameTop2.position.x = -.8
frameTop2.position.y = 1.7
frameTop2.position.z = -1.95 - 0.025

const frameMiddleX1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, .05, .09),
    frameMaterial
)
frameMiddleX1.castShadow = true
frameMiddleX1.receiveShadow = true
frameMiddleX1.position.x = 1
frameMiddleX1.position.y = 1.25
frameMiddleX1.position.z = 1.95 + 0.025

const frameMiddleX2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, .05, .09),
    frameMaterial
)
frameMiddleX2.castShadow = true
frameMiddleX2.receiveShadow = true
frameMiddleX2.position.x = -.8
frameMiddleX2.position.y = 1.25
frameMiddleX2.position.z = -1.95 - 0.025

const frameMiddleY1 = new THREE.Mesh(
    new THREE.BoxGeometry(.8, .05, .09),
    frameMaterial
)
frameMiddleY1.castShadow = true
frameMiddleY1.receiveShadow = true
frameMiddleY1.position.x = 1
frameMiddleY1.position.y = 1.25
frameMiddleY1.position.z = 1.95 + 0.03
frameMiddleY1.rotation.z = Math.PI * .5

const frameMiddleY2 = new THREE.Mesh(
    new THREE.BoxGeometry(.8, .05, .09),
    frameMaterial
)
frameMiddleY2.castShadow = true
frameMiddleY2.receiveShadow = true
frameMiddleY2.position.x = -.8
frameMiddleY2.position.y = 1.25
frameMiddleY2.position.z = -1.95 - 0.03
frameMiddleY2.rotation.z = Math.PI * .5

const frameBottom1 = new THREE.Mesh(
    new THREE.BoxGeometry(1.05, .1, .1),
    frameMaterial
)
frameBottom1.castShadow = true
frameBottom1.receiveShadow = true
frameBottom1.position.x = 1
frameBottom1.position.y = .75
frameBottom1.position.z = 1.95 + 0.025

const frameBottom2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, .1, .1),
    frameMaterial
)
frameBottom2.castShadow = true
frameBottom2.receiveShadow = true
frameBottom2.position.x = -.8
frameBottom2.position.y = .75
frameBottom2.position.z = -1.95 - 0.025

const frameRight1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, .1, .11),
    frameMaterial
)
frameRight1.castShadow = true
frameRight1.receiveShadow = true
frameRight1.position.x = 1.5
frameRight1.position.y = 1.255
frameRight1.position.z = 1.95 + 0.04
frameRight1.rotation.z = Math.PI * .5

const frameRight2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, .1, .11),
    frameMaterial
)
frameRight2.castShadow = true
frameRight2.receiveShadow = true
frameRight2.position.x = -1.3
frameRight2.position.y = 1.255
frameRight2.position.z = -1.95 - 0.04
frameRight2.rotation.z = Math.PI * .5

const frameLeft1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, .1, .11),
    frameMaterial
)
frameLeft1.castShadow = true
frameLeft1.receiveShadow = true
frameLeft1.position.x = .5
frameLeft1.position.y = 1.255
frameLeft1.position.z = 1.95 + 0.04
frameLeft1.rotation.z = Math.PI * .5

const frameLeft2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, .1, .11),
    frameMaterial
)
frameLeft2.castShadow = true
frameLeft2.receiveShadow = true
frameLeft2.position.x = -.3
frameLeft2.position.y = 1.255
frameLeft2.position.z = -1.95 - 0.04
frameLeft2.rotation.z = Math.PI * .5

windows.add(
    sill1, sill2, 
    frameTop1, frameTop2, 
    frameMiddleX1, frameMiddleX2,
    frameMiddleY1, frameMiddleY2,  
    frameBottom1, frameBottom2,
    frameRight1, frameRight2,
    frameLeft1, frameLeft2,
)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ 
    map: bushColorTexture,
    aoMap: bushAmbientOcclusionTexture,
    normalMap: bushNormalTexture,
    roughnessMap: bushRoughnessTexture,
    // displacementMap: bushHeightTexture,
    // displacementScale: .1,
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.castShadow = true
bush1.receiveShadow = true
bush1.scale.set(.5, 1, .5)
bush1.position.set(2.25, 0.2, 2.25)

// const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
// bush2.castShadow = true
// bush2.receiveShadow = true
// bush2.scale.set(.3, .3, .3)
// bush2.position.set(1.6, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.castShadow = true
bush3.receiveShadow = true
bush3.scale.set(.8, .5, .3)
bush3.position.set(1, 0.1, 2.3)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.castShadow = true
bush4.receiveShadow = true
bush4.scale.set(.5, 1, .5)
bush4.position.set(-2.25, 0.2, 2.25)

house.add(bush1, bush3, bush4)

// Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(.6, .8, .2)
const graveMaterial = new THREE.MeshStandardMaterial({ 
    map: gravesColorTexture,
    aoMap: gravesAmbientOcclusionTexture,
    normalMap: gravesNormalTexture,
    roughnessMap: gravesRoughnessTexture,
    // displacementMap: gravesHeightTexture,
    // displacementScale: .1,
 })

for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 4 + Math.random() * 5.75
    const x = Math.sin(angle) * radius
    const y = Math.random() * .3
    const z = Math.cos(angle) * radius
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.castShadow = true
    grave.position.set(x, y, z)
    grave.rotation.y = (Math.random() - .5) * .4
    grave.rotation.z = (Math.random() - .5) * .4
    graves.castShadow = true
    graves.add(grave)
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture,
    })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 2)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Door Light
const doorLight = new THREE.PointLight('#ff7d46', 3, 7)
doorLight.position.set(0, 2.2, 2.7)
scene.add(doorLight)

//
// Ghosts
//
const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
const ghost3 = new THREE.PointLight('#ffff00', 2, 3)
scene.add(ghost1, ghost2, ghost3)

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
renderer.setClearColor('#262837')
renderer.shadowMap.enabled = true

//
// Shadows
// 
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

roof.castShadow = true
walls.castShadow = true
bush1.castShadow = true
// bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

floor.receiveShadow = true

moonLight.shadow.mapSize.width = 1024
moonLight.shadow.mapSize.height = 1024
moonLight.shadow.camera.far = 20
moonLight.shadow.camera.top = 10
moonLight.shadow.camera.right = 10
moonLight.shadow.camera.left = - 10
moonLight.shadow.camera.bottom = - 10

// moonLight.shadow.camera.updateProjectionMatrix();

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7

// Helpers
// moonLight.shadow.camera.visible = true
// scene.add(new THREE.CameraHelper(moonLight.shadow.camera))


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Ghosts
    const ghostAngle = elapsedTime * .5
    ghost1.position.x = Math.cos(ghostAngle) * 4
    ghost1.position.z = Math.sin(ghostAngle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    const ghost2Angle = - elapsedTime * .32
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 1.25)

    const ghost3Angle = - elapsedTime * .18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * .32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * .5))
    ghost3.position.y = Math.sin(elapsedTime * 5) + Math.sin(elapsedTime * 2.25)


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()