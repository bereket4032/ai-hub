// Dropdown Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-toggle");
  const dropdown = document.getElementById("dropdown-content");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });
  }
});
