// ==========================
// Preloader
// ==========================
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => preloader.classList.add("loaded"), 400);
});

// ==========================
// Hero Name — Shake Reveal (letter by letter)
// ==========================
const heroName = document.getElementById("heroName");
if (heroName) {
    const name = heroName.textContent.trim();
    heroName.innerHTML = "";
    [...name].forEach((char, i) => {
        const span = document.createElement("span");
        span.className = "letter";
        span.textContent = char;
        span.style.animationDelay = `${i * 0.09 + 0.2}s`;
        heroName.appendChild(span);
    });
}

// ==========================
// Typing Effect (role text)
// ==========================
const roleText = "Aspiring Python Full Stack Developer";
const typing = document.querySelector(".typed-role");
let i = 0;
function typeWriter() {
    if (typing && i < roleText.length) {
        typing.innerHTML += roleText.charAt(i);
        i++;
        setTimeout(typeWriter, 65);
    }
}
setTimeout(typeWriter, 900);

// ==========================
// Navbar blur on scroll + active link
// ==========================
const navbar = document.querySelector(".glass-nav");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);

    let current = "";
    sections.forEach(section => {
        const top = section.offsetTop - 150;
        if (scrollY >= top) current = section.getAttribute("id");
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) link.classList.add("active");
    });

    backToTop.classList.toggle("visible", window.scrollY > 400);
});

// Close mobile nav on link click
const bsCollapseEl = document.getElementById("navLinks");
document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
    link.addEventListener("click", () => {
        if (bsCollapseEl.classList.contains("show")) {
            bootstrap.Collapse.getOrCreateInstance(bsCollapseEl).hide();
        }
    });
});

// ==========================
// Scroll Reveal
// ==========================
const revealEls = document.querySelectorAll("[data-reveal]");
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ==========================
// Universal 3D Tilt Effect
// ==========================
const tiltElements = document.querySelectorAll("[data-tilt]");
tiltElements.forEach(el => {
    el.addEventListener("mousemove", e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = -(y - rect.height / 2) / 18;
        const rotateY = (x - rect.width / 2) / 18;
        el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });
    el.addEventListener("mouseleave", () => {
        el.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
    });
});

// ==========================
// Code Editor Tabs (hero)
// ==========================
const codeTabs = document.querySelectorAll(".code-tab");
const tabPanes = document.querySelectorAll(".tab-pane");
codeTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        codeTabs.forEach(t => t.classList.remove("active"));
        tabPanes.forEach(p => p.classList.remove("active"));
        tab.classList.add("active");
        document.querySelector(`.tab-pane[data-pane="${tab.dataset.tab}"]`).classList.add("active");
    });
});

// ==========================
// Certificate Modal — fill image dynamically
// ==========================
const certModal = document.getElementById("certModal");
if (certModal) {
    certModal.addEventListener("show.bs.modal", (event) => {
        const trigger = event.relatedTarget;
        const imgSrc = trigger.getAttribute("data-img");
        const title = trigger.getAttribute("data-title");
        document.getElementById("certModalImg").src = imgSrc;
        document.getElementById("certModalTitle").textContent = title;
    });
}

// ==========================
// Contact Form — demo submit + toast
// ==========================
const contactForm = document.getElementById("contactForm");
const sendToast = document.getElementById("sendToast");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }
        bootstrap.Toast.getOrCreateInstance(sendToast).show();
        contactForm.reset();
    });
}

// ==========================
// Back to Top
// ==========================
const backToTop = document.getElementById("backToTop");
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});