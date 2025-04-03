// script.js
let slideIndex = 0;
        showSlides();

        function showSlides() {
            let i;
            const slides = document.getElementsByClassName("mySlides");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none"; // Hide all slides
            }
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1
            } // Reset to first slide
            slides[slideIndex - 1].style.display = "block"; // Show the current slide
            setTimeout(showSlides, 3000); // Change slide every 3 seconds
        }

        function plusSlides(n) {
            slideIndex += n;
            const slides = document.getElementsByClassName("mySlides");
            if (slideIndex > slides.length) {
                slideIndex = 1
            }
            if (slideIndex < 1) {
                slideIndex = slides.length
            }
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none"; // Hide all slides
            }
            slides[slideIndex - 1].style.display = "block"; // Show the current slide
        }
            // Dark mode toggle
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
 });

  let autoScroll = setInterval(() => {
      window.scrollBy(0, 2); // Scrolls down 2 pixels every 50 milliseconds
  }, 50);

  // Stop auto-scrolling when the user interacts with the page
  document.addEventListener("scroll", () => {
      clearInterval(autoScroll);
      });


