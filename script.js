document.addEventListener("DOMContentLoaded", () => {
  // === Dynamic Greeting (if element exists) ===
  const greetingElement = document.getElementById("greeting");
  if (greetingElement) {
    const hour = new Date().getHours();
    let greeting = "Hello!";
    if (hour < 12) greeting = "Good Morning!";
    else if (hour < 18) greeting = "Good Afternoon!";
    else greeting = "Good Evening!";
    greetingElement.textContent = greeting;
  }

  // === Mobile Navigation Toggle ===
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // === Contact Form Validation ===
  const contactForm = document.getElementById("contact-form"); // ✅ fixed
  if (contactForm) {
    const formMessage = document.createElement("p");
    formMessage.id = "form-message";
    formMessage.style.marginTop = "10px";
    contactForm.appendChild(formMessage);

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        showFormMessage("❌ Please fill in all fields.", "error");
        return;
      }
      if (!email.includes("@")) {
        showFormMessage("❌ Please enter a valid email address.", "error");
        return;
      }

      showFormMessage("✅ Form submitted successfully!", "success");
      contactForm.reset();

      function showFormMessage(msg, type) {
        formMessage.textContent = msg;
        formMessage.style.color = type === "error" ? "red" : "green";
      }
    });
  }

  // === Scroll to Top Button (if exists) ===
  const scrollBtn = document.getElementById("scroll-top");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // === Theme Switcher (if exists) ===
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      themeToggle.textContent = document.body.classList.contains("dark-theme")
        ? "Switch to Light Mode"
        : "Switch to Dark Mode";
    });
  }

  // === Weather Widget ===
  const apiKey = "e9247150fd652e9cd4e9efc6b461a9f8"; // ✅ your key
  const weatherBtn = document.getElementById("getWeather");
  if (weatherBtn) {
    weatherBtn.addEventListener("click", () => {
      const city = document.getElementById("city").value.trim();
      const weatherResult = document.getElementById("weatherResult");

      if (!city) {
        weatherResult.textContent = "Please enter a city name.";
        return;
      }

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
          if (data.cod === 200) {
            weatherResult.textContent =
              `🌤️ ${data.name}, ${data.sys.country}: ${data.main.temp}°C, ${data.weather[0].description}`;
          } else {
            weatherResult.textContent = "City not found!";
          }
        })
        .catch(() => {
          weatherResult.textContent = "Error fetching weather.";
        });
    });
  }
});
