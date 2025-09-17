document.addEventListener("DOMContentLoaded", () => {
  // Dropdown Toggle
  const menuBtn = document.getElementById("menu-toggle");
  const dropdown = document.getElementById("dropdown-content");
  if(menuBtn){
    menuBtn.addEventListener("click", () => {
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });
    // Close dropdown if clicked outside
    window.addEventListener("click", (e) => {
      if(!menuBtn.contains(e.target) && !dropdown.contains(e.target)){
        dropdown.style.display = "none";
      }
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if(target) target.scrollIntoView({behavior:"smooth"});
    });
  });

  // Scroll to specific service section on card click
  document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("click", () => {
      const target = document.querySelector(card.dataset.target);
      if(target) target.scrollIntoView({behavior:"smooth"});
    });
  });
});
