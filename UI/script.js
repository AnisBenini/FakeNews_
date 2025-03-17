
// Toggle Dark / Light Theme
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("light-theme");
    if(document.documentElement.classList.contains("light-theme")){
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>'; // Icône pour revenir en dark mode
    } else {
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>'; // Icône pour passer en light mode
    }
});

// Défilement fluide vers une section donnée
function scrollToSection(id) {
    const target = document.getElementById(id);
    const headerOffset = document.getElementById("header").offsetHeight;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
}

// Gestion du menu mobile
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", () => {
    mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex";
});
document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
    mobileMenu.style.display = "none";
    });
});

// Header réactif & Bouton "Back to Top"
const header = document.getElementById("header");
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 100);
    backToTop.style.display = window.scrollY > 300 ? "flex" : "none";
});

// Révélation progressive des sections via Intersection Observer
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
    }
    });
}, { threshold: 0.25 });
sections.forEach(section => observer.observe(section));

// Animation du fond en canvas : réseau de particules
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
const particleCount = 150;
const particles = [];
const maxDistance = 100;
for (let i = 0; i < particleCount; i++) {
    particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: Math.random() * 2 + 1
    });
}
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleCount; i++) {
    let p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
    if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;
    let particleColor = getComputedStyle(document.documentElement)
                            .getPropertyValue("--particle-color").trim();
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
    ctx.fillStyle = particleColor;
    ctx.fill();
    }
    for (let i = 0; i < particleCount; i++) {
    for (let j = i + 1; j < particleCount; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDistance) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        let isLight = document.documentElement.classList.contains("light-theme");
        let lineColor = isLight ? "rgba(0,0,0," : "rgba(255,255,255,";
        ctx.strokeStyle = lineColor + (1 - dist / maxDistance) + ")";
        ctx.lineWidth = 0.5;
        ctx.stroke();
        }
    }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Démo interactive : simulation de détection
document.getElementById("analyzeBtn").addEventListener("click", () => {
    const text = document.getElementById("inputText").value.trim();
    const resultDiv = document.getElementById("result");
    const defaultTextColor = getComputedStyle(document.documentElement)
                                .getPropertyValue("--text-color").trim() || "#e0e0e0";
    if (text === "") {
    resultDiv.textContent = "Veuillez entrer un texte pour analyser.";
    resultDiv.style.color = defaultTextColor;
    return;
    }
    const probability = Math.floor(Math.random() * 100) + 1;
    if (probability > 50) {
    resultDiv.textContent = "Analyse : Le texte est très probablement une FAKE NEWS (" + probability + "%).";
    resultDiv.style.color = "#ff5555";
    } else {
    resultDiv.textContent = "Analyse : Le texte semble fiable (" + (100 - probability) + "% de fiabilité).";
    resultDiv.style.color = "#55ff55";
    }
});

// Défilement fluide vers le haut
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
