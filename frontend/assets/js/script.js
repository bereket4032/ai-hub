// script.js
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Hamburger toggle ---------- */
  const hb = document.getElementById("hamburger");
  const hbPanel = document.getElementById("hamburger-panel");
  if (hb) {
    hb.addEventListener("click", (e) => {
      const shown = hbPanel.style.display === "block";
      hbPanel.style.display = shown ? "none" : "block";
    });

    // hide panel when clicking outside
    window.addEventListener("click", (e) => {
      if (!hb.contains(e.target) && !hbPanel.contains(e.target)) {
        hbPanel.style.display = "none";
      }
    });
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener("click", function(e){
      const href = this.getAttribute("href");
      if (href === "#" || href === "") return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({behavior:"smooth", block:"start"}); }
    });
  });

  /* ---------- Simple hero crossfade slideshow ---------- */
  (function heroSlideshow(){
    const hero = document.querySelector('.hero');
    const layer = document.createElement('div');
    layer.className = 'hero-bg-layer';
    hero.appendChild(layer);

    const images = [
      'assets/images/hero1.png',
      'assets/images/hero2.png',
      'assets/images/hero3.png',
      'assets/images/hero4.png'
    ].filter(Boolean);

    let idx = 0;
    // Preload
    images.forEach(src => { const i=new Image(); i.src=src; });

    // two layered fade approach
    const bgA = hero; // :before initially shows hero1 via CSS
    const bgLayer = layer; // JS will toggle opacity/background-image on this layer

    // start with second image in JS layer
    bgLayer.style.backgroundImage = `url('${images[1 % images.length]}')`;
    bgLayer.style.opacity = 0;

    setInterval(()=> {
      idx = (idx + 1) % images.length;
      const nextImage = images[idx];
      // fade in layer with next image
      bgLayer.style.backgroundImage = `url('${nextImage}')`;
      bgLayer.style.transition = 'opacity 1s ease-in-out';
      bgLayer.style.opacity = 1;

      // after fade, switch :before background to this image, and reset layer to invisible
      setTimeout(()=> {
        document.querySelector('.hero').style.setProperty('--dummy', ''); // noop
        // change the CSS :before background by injecting style (quick approach)
        const rule = document.styleSheets[0];
        // fallback: set hero::before inline (not possible), so we set hero.style background temporarily:
        document.querySelector('.hero').style.backgroundImage = `url('${nextImage}')`;
        bgLayer.style.opacity = 0;
      }, 1100);

    }, 6000);
  })();


  /* ---------- Contact form placeholder ---------- */
  const contactForm = document.getElementById('contact-form');
  const statusEl = document.getElementById('contact-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      statusEl.textContent = 'Sending...';

      const payload = {
        name: document.getElementById('contact-name').value,
        email: document.getElementById('contact-email').value,
        message: document.getElementById('contact-message').value,
      };

      // For now just simulate success; later point to your backend endpoint /api/contact
      try {
        // Example: await fetch('https://your-backend.example.com/api/contact', { method:'POST', body: JSON.stringify(payload) ... })
        await new Promise(r=>setTimeout(r,800));
        contactForm.reset();
        statusEl.textContent = 'Message sent — thank you!';
      } catch (err) {
        statusEl.textContent = 'Failed to send. Please email directly.';
      }
    });
  }

});
