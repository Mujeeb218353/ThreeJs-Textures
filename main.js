import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as lil from 'lil-gui';

const scene =  new THREE.Scene();
const camera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 5);

const highIntensityLight =  new THREE.DirectionalLight("white", 2);
highIntensityLight.position.set(10, 20, 15);
scene.add(highIntensityLight);

const directionalLight = new THREE.DirectionalLight("white", 1);
directionalLight.position.set(5, 10, 8);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight("white", .5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight("white", 1, 100, 2);
pointLight.position.set(1, 1, 1);
scene.add(pointLight);

const canvas = document.getElementById('canvas');

const renderer = new THREE.WebGLRenderer({
  canvas, 
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BoxGeometry(3, 1.8, 2, 100, 100);

let loader = new THREE.TextureLoader();
let color = loader.load("ThreeJs-Textures/text/paper_0025_color_1k.jpg");
let roughness = loader.load("ThreeJs-Textures/text/paper_0025_roughness_1k.jpg");
let normal = loader.load("/ThreeJs-Textures/text/paper_0025_normal_opengl_1k.png");
// let height = loader.load("/ThreeJs-Textures/text/paper_0025_height_1k.png");



const material = new THREE.MeshStandardMaterial({ 
  side: THREE.DoubleSide,
  map: color,
  roughnessMap: roughness,
  normalMap: normal,
  // displacementMap: height,
  // displacementScale: 0.01,
});

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});


const gui = new lil.GUI();

// Material settings
const materialFolder = gui.addFolder('Material');
materialFolder.add(material, 'wireframe');
materialFolder.add(material, 'roughness', 0, 1);
materialFolder.add(material, 'metalness', 0, 1);
materialFolder.add(material.normalScale, 'x', 0, 1).name('Normal Scale X');
materialFolder.add(material.normalScale, 'y', 0, 1).name('Normal Scale Y');
materialFolder.addColor(material, 'color').name('Color');

// Mesh settings
const meshFolder = gui.addFolder('Mesh');
meshFolder.add(cube.rotation, 'x', 0, Math.PI * 2).name('Rotation X');
meshFolder.add(cube.rotation, 'y', 0, Math.PI * 2).name('Rotation Y');
meshFolder.add(cube.rotation, 'z', 0, Math.PI * 2).name('Rotation Z');
meshFolder.add(cube.position, 'x', -5, 5).name('Position X');
meshFolder.add(cube.position, 'y', -5, 5).name('Position Y');
meshFolder.add(cube.position, 'z', -5, 5).name('Position Z');
meshFolder.add(cube.scale, 'x', 0.1, 2).name('Scale X');
meshFolder.add(cube.scale, 'y', 0.1, 2).name('Scale Y');
meshFolder.add(cube.scale, 'z', 0.1, 2).name('Scale Z');

// Light settings
const lightFolder = gui.addFolder('Light');
lightFolder.add(pointLight, 'intensity', 0, 2).name('Light Intensity');
lightFolder.add(pointLight.position, 'x', -5, 5).name('Light Position X');
lightFolder.add(pointLight.position, 'y', -5, 5).name('Light Position Y');
lightFolder.add(pointLight.position, 'z', -5, 5).name('Light Position Z');

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  controls.update();
}

animate();