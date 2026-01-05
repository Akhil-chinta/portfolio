/* SCROLL REVEAL + FUNNEL + CONVERSION LOGIC */

const sections = document.querySelectorAll(".section");
const funnel = document.querySelector(".funnel");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show", "pulse");
        setTimeout(() => entry.target.classList.remove("pulse"), 1200);
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach((section) => observer.observe(section));

/* FUNNEL HEIGHT = SCROLL DEPTH */
window.addEventListener("scroll", () => {
  const scrollHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / scrollHeight) * window.innerHeight;
  funnel.style.height = `${progress}px`;
});

/* THEME TOGGLE */
const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  const body = document.body;
  body.dataset.theme = body.dataset.theme === "dark" ? "light" : "dark";
  toggle.textContent = body.dataset.theme === "dark" ? "☀" : "🌙";
});

/* ===== PERFORMANCE MARKETING DATA BACKGROUND ===== */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z = 120;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("castleCanvas"),
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const geometry = new THREE.BufferGeometry();
const count = 1500;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 400;
}

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0x38bdf8,
  size: 1.2,
  transparent: true,
  opacity: 0.85,
});

const points = new THREE.Points(geometry, material);
scene.add(points);
scene.add(new THREE.AmbientLight(0x38bdf8, 0.4));

let mouseX = 0,
  mouseY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
  mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
});

function animate() {
  requestAnimationFrame(animate);
  points.rotation.y += 0.0006;
  camera.position.x += (mouseX * 40 - camera.position.x) * 0.05;
  camera.position.y += (-mouseY * 40 - camera.position.y) * 0.05;
  renderer.render(scene, camera);
}

animate();
