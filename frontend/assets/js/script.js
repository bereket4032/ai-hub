// script.js
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Mobile menu toggle ---------- */
  const hb = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  if (hb && mobileMenu) {
    hb.addEventListener("click", (e) => {
      e.stopPropagation();
      const shown = mobileMenu.style.display === "flex";
      mobileMenu.style.display = shown ? "none" : "flex";
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !hb.contains(e.target)) {
        mobileMenu.style.display = "none";
      }
    });

    // Auto-close menu on link click (smooth scroll)
    mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          mobileMenu.style.display = "none";
        }
      });
    });
  }

  /* ---------- Smooth scroll for desktop ---------- */
  document.querySelectorAll('.nav-list a[href^="#"]').forEach(a => {
    a.addEventListener("click", function(e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ---------- Hero Slideshow ---------- */
  (function heroSlideshow() {
    const hero = document.querySelector('.hero');
    const layer = document.createElement('div');
    layer.className = 'hero-bg-layer';
    hero.appendChild(layer);

    const images = [
      'assets/images/hero1.png',
      'assets/images/hero2.png',
      'assets/images/hero3.png',
      'assets/images/hero4.png'
    ];
    let idx = 0;
    images.forEach(src => { const i = new Image(); i.src = src; });

    setInterval(() => {
      idx = (idx + 1) % images.length;
      const nextImage = images[idx];
      layer.style.backgroundImage = `url('${nextImage}')`;
      layer.style.transition = 'opacity 1s ease-in-out';
      layer.style.opacity = 1;
      setTimeout(() => {
        hero.style.backgroundImage = `url('${nextImage}')`;
        layer.style.opacity = 0;
      }, 1000);
    }, 6000);
  })();

});
