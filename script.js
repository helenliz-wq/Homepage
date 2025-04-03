function openLightbox(image) {
    document.getElementById('lightbox').style.display = 'flex';
    document.getElementById('lightbox-img').src = image.src;
}

// Close Lightbox
function closeLightbox() {
    document.getElementById('lightbox').style.display='none';
}
const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});
