// shareProfile.js

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("shareBtn");
  const shareBox = document.getElementById("shareBox");

  btn.addEventListener("click", () => {
    // toggle "d-none" class to show/hide
    shareBox.classList.toggle("d-none");
  });
});
