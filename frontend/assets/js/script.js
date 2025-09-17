// Dropdown Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-toggle");
  const dropdown = document.getElementById("dropdown-content");
  const API_URL = "https://ai-hub-backend.onrender.com/api/chat";


  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });
  }
});
