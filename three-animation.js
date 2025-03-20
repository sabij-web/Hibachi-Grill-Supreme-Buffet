import * as THREE from 'https://unpkg.com/three@0.157.0/build/three.module.js';

// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

// Create particle system
const particleGeometry = new THREE.BufferGeometry();
const particleCount = 1000;
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;

    colors[i] = Math.random() * 0.5 + 0.5; // R
    colors[i + 1] = Math.random() * 0.3; // G
    colors[i + 2] = Math.random() * 0.3; // B
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particleMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
});

const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Position camera
camera.position.z = 5;

// Mouse interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
});

// Scroll interaction
let scrollY = 0;
document.addEventListener('scroll', () => {
    scrollY = window.scrollY * 0.001;
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    particles.rotation.x += 0.001;
    particles.rotation.y += 0.002;

    particles.rotation.y += targetX * 0.5;
    particles.rotation.x += targetY * 0.5;

    // Parallax effect based on scroll
    particles.position.y = -scrollY * 2;

    renderer.render(scene, camera);
}

// Initialize Three.js container
document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.zIndex = '-1';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);
    container.appendChild(renderer.domElement);

    animate();
});