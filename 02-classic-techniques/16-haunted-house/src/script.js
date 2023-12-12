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

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
grassColorTexture.colorSpace = THREE.SRGBColorSpace
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

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
    })
    
    )
    walls.position.y = 2.5 / 2
    walls.castShadow = true
    walls.receiveShadow = true
    house.add(walls)
    
    // Roof
    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(3.5, 1, 4),
        new THREE.MeshStandardMaterial({ color: '#b35f45' })
        )
        roof.position.y = 2.5 + 0.5
        roof.rotation.y = Math.PI * .25
        house.add(roof)
        
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
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.castShadow = true
bush1.receiveShadow = true
bush1.scale.set(.5, 1, .5)
bush1.position.set(2.25, 0.2, 2.25)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.castShadow = true
bush2.receiveShadow = true
bush2.scale.set(.3, .3, .3)
bush2.position.set(1.6, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.castShadow = true
bush3.receiveShadow = true
bush3.scale.set(.7, .3, .3)
bush3.position.set(- 1.2, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.castShadow = true
bush4.receiveShadow = true
bush4.scale.set(.5, 1, .5)
bush4.position.set(-2.25, 0.2, 2.25)

house.add(bush1, bush2, bush3, bush4)

// Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(.6, .8, .2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

for(let i = 0; i < 50; i++) {
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
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
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
bush2.castShadow = true
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
moonLight.shadow.camera.visible = true
scene.add(new THREE.CameraHelper(moonLight.shadow.camera))


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
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