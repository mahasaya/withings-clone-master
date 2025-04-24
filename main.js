import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.querySelector(".three-D-model")
container.style.minHeight = "500px";
container.style.width = "350px"
const w = container.clientWidth;
const h = container.clientHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
container.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, w/h, 0.1,1000);
camera.position.z = 150;
camera.position.y=20
camera.position.x=10

const scene = new THREE.Scene();
const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping= true;
controls.dampingFactor= 0.03
controls.enableZoom = false;
scene.background = new THREE.Color(0xffffff);

const loader = new GLTFLoader();
let model;

loader.load(
    'woman-2.gltf', 
    (gltf) => {
        // gltf.scene.traverse((child) => {
        //     if (child.isMesh) {
        //         child.material.metalness = 0.5; 
        //         child.material.roughness = 1; 
        //     }
        //   });
        model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.y = -90; 
        scene.add(model);
    },
    undefined,
    (error) => {
        console.error('Error loading model:', error);       
    }
);


// Lights
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(1, 1, 1);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 2));

function animate() {
    requestAnimationFrame(animate);
    if (model) model.rotation.y += 0.002;
    renderer.render(scene, camera);
    controls.update()
}
animate();

window.addEventListener('resize', () => {
    camera.aspect =container.clientWidth / container.clientWidth;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientWidth);
});

