// =========================
// UTILITAIRES
// =========================
function debounce(func, wait = 10) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// =========================
// SCROLL REVEAL
// =========================
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));

// =========================
// NAVBAR + LIENS ACTIFS
// =========================
const header = document.querySelector(".header");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".header nav a");

window.addEventListener("scroll", debounce(() => {
    header.classList.toggle("scrolled", window.scrollY > 50);

    let current = sections[0]?.id || "";

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle("active", 
            link.getAttribute("href") === `#${current}`
        );
    });
}), { passive: true });

// =========================
// BURGER MENU
// =========================
const burger = document.querySelector(".burger");
const nav = document.querySelector(".header nav");

burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", isOpen);
    burger.classList.toggle("active", isOpen);
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        burger.classList.remove("active");
    });
});

// Fermeture au clic extérieur
document.addEventListener("click", (e) => {
    if (!e.target.closest(".header") && nav.classList.contains("open")) {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        burger.classList.remove("active");
    }
});

// =========================
// MODAL
// =========================
const modal = document.getElementById("projectModal");
const openButtons = document.querySelectorAll(".open-project");
const closeModal = document.querySelector(".close-modal");

function openModal() {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    closeModal?.focus();
}

function closeModalFunc() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
}

openButtons.forEach(button => {
    button.addEventListener("click", openModal);
});

closeModal?.addEventListener("click", closeModalFunc);

window.addEventListener("click", (e) => {
    if (e.target === modal) closeModalFunc();
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("active")) {
        closeModalFunc();
    }
});

// Piège focus
modal?.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    
    const focusable = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
    }
});