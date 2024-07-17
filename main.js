import './style.css'  
import * as THREE from 'three';

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card');

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('show');
          } else {
              entry.target.classList.remove('show');
          }
      });
  });

  cards.forEach(card => {
      observer.observe(card);
  });

  cards.forEach(card => {
    observer.observe(card);
  });
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background-scene').appendChild(renderer.domElement);

scene.background = new THREE.Color(0x4e17cf);

const shapes = [];

function createShape(geometry, material, x, y, z) {
  const shape = new THREE.Mesh(geometry, material);
  shape.position.set(x, y, z);
  scene.add(shape);
  shapes.push(shape);
}

const materials = [
  new THREE.MeshStandardMaterial({ color: 0xFFFFFF}),
  new THREE.MeshBasicMaterial({ color: 0x00EE00, wireframe: true })
];

createShape(new THREE.TorusGeometry( 7.5, 2.25, 16, 100 ), materials[0], 8, 0, -12);
createShape(new THREE.BoxGeometry( 10, 10, 10 ), materials[0], -10, -24, -12);
createShape(new THREE.TetrahedronGeometry(10,0), materials[0], 10, -48, -12);
createShape(new THREE.TorusKnotGeometry( 4, 1.25, 200, 32 ), materials[0], -10, -72, -10);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 250);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  shapes.forEach(shape => {
    shape.rotation.x += 0.005;
    shape.rotation.y += 0.01;
  });

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  camera.position.y = 0 - scrollY * 0.025;
  pointLight.position.y = 0 - scrollY * 0.025;

  renderer.render(scene, camera);
});