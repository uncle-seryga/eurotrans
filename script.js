const header = document.getElementById("siteHeader");
const burgerBtn = document.getElementById("burgerBtn");
const mainNav = document.getElementById("mainNav");

// Скролл шапки
if (header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

// Бургер-меню
if (burgerBtn && mainNav) {
    burgerBtn.addEventListener("click", () => {
        mainNav.classList.toggle("open");
        burgerBtn.classList.toggle("active");
    });

    document.querySelectorAll(".nav a").forEach((link) => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
            burgerBtn.classList.remove("active");
        });
    });
}

// Слайдер
const slides = document.querySelectorAll(".hero-slide");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");
const dotsWrap = document.getElementById("heroDots");

let currentSlide = 0;
let autoSlide;

function updateDots() {
    const dots = document.querySelectorAll(".hero-dot");
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
    });
}

function goToSlide(index) {
    if (!slides.length) return;

    slides[currentSlide].classList.remove("active");
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    updateDots();
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

function startAutoSlide() {
    if (slides.length > 1) {
        autoSlide = setInterval(nextSlide, 5500);
    }
}

function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

function createDots() {
    if (!dotsWrap || !slides.length) return;

    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.className = "hero-dot";
        if (index === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
            goToSlide(index);
            resetAutoSlide();
        });

        dotsWrap.appendChild(dot);
    });
}

if (slides.length) {
    createDots();
    startAutoSlide();
}

if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
    });
}

if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
    });
}

// Reveal animation
const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
}

// Лічильники
const counters = document.querySelectorAll(".stat-number");

if (counters.length) {
    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const el = entry.target;
                const target = +el.getAttribute("data-target");
                const duration = 1500;
                let start = 0;
                const step = target / (duration / 16);

                function updateCounter() {
                    start += step;

                    if (start < target) {
                        el.textContent = Math.floor(start).toLocaleString("uk-UA");
                        requestAnimationFrame(updateCounter);
                    } else {
                        el.textContent = target.toLocaleString("uk-UA");
                    }
                }

                updateCounter();
                counterObserver.unobserve(el);
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
}