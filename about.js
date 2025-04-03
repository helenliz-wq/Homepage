function showTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}
          // Dark mode toggle
          const darkModeToggle = document.getElementById("dark-mode-toggle");
          darkModeToggle.addEventListener("click", function() {
              document.body.classList.toggle("dark-mode");
       });
      