const modal = document.querySelector("#myModal");
const openModal = document.querySelector("#openModal");
const closeModal = document.querySelector(".close");

openModal.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

let slideIndex = 0; // Start with the first slide
const slides = document.querySelectorAll(".carousel-slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// Function to show the current slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
}

// Show the initial slide
showSlide(slideIndex);

// Event listener for the "Previous" button
prevBtn.addEventListener("click", () => {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length; // Loop back to the last slide if at the first slide
  showSlide(slideIndex);
});

// Event listener for the "Next" button
nextBtn.addEventListener("click", () => {
  slideIndex = (slideIndex + 1) % slides.length; // Loop back to the first slide if at the last slide
  showSlide(slideIndex);
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-Form");
  const formError = document.querySelector("#formError");

  form.addEventListener("submit", (e) => {
      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const message = document.querySelector("#message").value.trim();

      let errorMessage = "";

      // Validate Name
      if (!name) {
          errorMessage += "Name is required. ";
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
      if (!email) {
          errorMessage += "Email is required. ";
      } else if (!emailPattern.test(email)) {
          errorMessage += "Please enter a valid email address. ";
      }

      // Validate Message
      if (!message) {
          errorMessage += "Message is required.";
      }

      // If there are errors, prevent form submission and display the error message
      if (errorMessage) {
          e.preventDefault();
          formError.textContent = errorMessage;
          formError.style.color = "red"; // Optional: Style the error message
      } else {
          formError.textContent = ""; // Clear error message
          alert("Form submitted successfully!");
      }
  });
});

const toggleButton = document.querySelector("#toggleActivities");
const activities = document.querySelector(".container");

toggleButton.addEventListener("click", () => {
  activities.style.display =
    activities.style.display === "none" ? "block" : "none";
});

const resultsTable = document.querySelector("#unebResults tbody");
const addRowButton = document.querySelector("#addRow");
if (addRowButton && resultsTable) {
addRowButton.addEventListener("click", () => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = "<td>New Grade</td><td>123</td>";
  resultsTable.appendChild(newRow);
});
}else{
  console.error("Add Row button or results table not found.");
}

document.querySelectorAll('.accordion').forEach(button => {
  button.addEventListener('click', () => {
    const panel = button.nextElementSibling;
    const isOpen = panel.style.display === 'block';

    document.querySelectorAll('.panel').forEach(item => item.style.display = 'none');

    panel.style.display = isOpen ? 'none' : 'block';
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const calendarBody = document.querySelector("#calendarBody");
  const monthYear = document.querySelector("#monthYear");
  const prevMonth = document.querySelector("#prevMonth");
  const nextMonth = document.querySelector("#nextMonth");

  let currentDate = new Date();

  function renderCalendar(date) {
      const year = date.getFullYear();
      const month = date.getMonth();

      // Set the month and year in the header
      const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
      ];
      monthYear.textContent = '&{monthNames[month]} ${year}';

      // Get the first and last days of the month
      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();

      // Clear the calendar body
      calendarBody.innerHTML = "";

      // Generate the days of the calendar
      let day = 1;
      for (let i = 0; i < 6; i++) { // 6 rows for the calendar
          const row = document.createElement("tr");

          for (let j = 0; j < 7; j++) { // 7 columns for the days
              const cell = document.createElement("td");

              if (i === 0 && j < firstDay) {
                  // Empty cells before the first day of the month
                  cell.classList.add("inactive");
              } else if (day > lastDate) {
                  // Empty cells after the last day of the month
                  cell.classList.add("inactive");
              } else {
                  cell.textContent = day;
                  day++;
              }

              row.appendChild(cell);
          }

          calendarBody.appendChild(row);
      }
  }

  // Event listeners for navigation buttons
  prevMonth.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
  });

  nextMonth.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
  });

  // Render the initial calendar
  renderCalendar(currentDate);
});

document.addEventListener("DOMContentLoaded", () => {
  const calendarBody = document.querySelector("#calendarBody");
  const monthYear = document.querySelector("#monthYear");
  const prevMonth = document.querySelector("#prevMonth");
  const nextMonth = document.querySelector("#nextMonth");

  let currentDate = new Date();
  const events = {}; // Object to store events (e.g., { "2025-04-15": "Event Title" })

  function renderCalendar(date) {
      const year = date.getFullYear();
      const month = date.getMonth();

      // Set the month and year in the header
      const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
      ];
      monthYear.textContent = '${monthNames[month]} ${year}';

      // Get the first and last days of the month
      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();

      // Clear the calendar body
      calendarBody.innerHTML = "";

      // Generate the days of the calendar
      let day = 1;
      for (let i = 0; i < 6; i++) { // 6 rows for the calendar
          const row = document.createElement("tr");

          for (let j = 0; j < 7; j++) { // 7 columns for the days
              const cell = document.createElement("td");

              if (i === 0 && j < firstDay) {
                  // Empty cells before the first day of the month
                  cell.classList.add("inactive");
              } else if (day > lastDate) {
                  // Empty cells after the last day of the month
                  cell.classList.add("inactive");
              } else {
                  const dateKey = '${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2, ""0")}';
                  cell.textContent = day;

                  // Highlight cells with events
                  if (events[dateKey]) {
                      cell.classList.add("event");
                      cell.title = events[dateKey]; // Show event title on hover
                  }

                  // Add click event to add new events
                  cell.addEventListener("click", () => {
                      const eventTitle = prompt("Enter event title:");
                      if (eventTitle) {
                          events[dateKey] = eventTitle;
                          renderCalendar(currentDate); // Re-render the calendar to show the event
                      }
                  });

                  day++;
              }

              row.appendChild(cell);
          }

          calendarBody.appendChild(row);
      }
  }

  // Event listeners for navigation buttons
  prevMonth.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
  });

  nextMonth.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
  });

  // Render the initial calendar
  renderCalendar(currentDate);
});

document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.querySelector("#darkModeToggle");
  const body = document.body;

  // Check if dark mode is already enabled in localStorage
  if (localStorage.getItem("darkMode") === "enabled") {
      body.classList.add("dark-mode");
  }

  // Toggle dark mode on button click
  darkModeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      // Save the user's preference in localStorage
      if (body.classList.contains("dark-mode")) {
          localStorage.setItem("darkMode", "enabled");
      } else {
          localStorage.setItem("darkMode", "disabled");
      }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial");
  let currentIndex = 0;

  function showNextTestimonial() {
      // Remove the active class from the current testimonial
      testimonials[currentIndex].classList.remove("active");

      // Add the previous class for smooth exit animation
      testimonials[currentIndex].classList.add("previous");

      // Move to the next testimonial
      currentIndex = (currentIndex + 1) % testimonials.length;

      // Add the active class to the next testimonial
      testimonials[currentIndex].classList.add("active");

      // Remove the previous class after the animation ends
      setTimeout(() => {
          testimonials.forEach((testimonial) => testimonial.classList.remove("previous"));
      }, 1000); // Match the CSS transition duration
  }

  // Automatically scroll testimonials every 5 seconds
  setInterval(showNextTestimonial, 5000);
});
document.getElementById('addRow').addEventListener('click', function() {
  const tableBody = document.getElementById('unebResults').getElementsByTagName('tbody')[0];
  const newRow = tableBody.insertRow();
  const category = prompt('Enter the category:');
  const result = prompt('Enter the result:');
  if (category && result) {
      newRow.insertCell(0).textContent = category;
      newRow.insertCell(1).textContent = result;
  } else {
      alert('Both fields are required to add a new row.');
      tableBody.deleteRow(newRow.rowIndex - 1); // Remove the empty row if inputs are invalid
}
});