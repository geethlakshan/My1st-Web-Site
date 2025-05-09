document.addEventListener("DOMContentLoaded", function() {
    const clickButton = document.getElementById("clickButton");
    const navbarLinks = document.querySelectorAll(".navbar a");
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
    const header1 = document.querySelector(".header1");
    const pageTitleContainer = document.querySelector(".page-title-container");
    const sideNavbar = document.querySelector(".side-navbar");

    // Initially hide the header and fixed elements
    if (header1) header1.classList.add("hidden");
    if (pageTitleContainer) pageTitleContainer.classList.remove("visible");
    if (sideNavbar) sideNavbar.classList.remove("visible");
    body.style.opacity = 1; // Make the body visible

    let isScrolling = false;

    function handleScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(updateOnScroll);
            isScrolling = true;
        }
    }

    function updateOnScroll() {
        const scrollPosition = window.scrollY;

        // Toggle small page title
        if (pageTitleContainer) {
            if (scrollPosition > 50) {
                pageTitleContainer.classList.add("visible");
            } else {
                pageTitleContainer.classList.remove("visible");
            }
        }

        // Toggle side navigation
        if (sideNavbar) {
            if (scrollPosition > 200) {
                sideNavbar.classList.add("visible");
            } else {
                sideNavbar.classList.remove("visible");
            }
        }

        // Hide the main header
        if (header1) {
            if (scrollPosition > 100) {
                header1.classList.add("hidden");
            } else {
                header1.classList.remove("hidden");
            }
        }

        // Highlight the active navigation link
        const scrollMiddle = window.scrollY + window.innerHeight / 2;
        navbarLinks.forEach(link => {
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement &&
                targetElement.offsetTop <= scrollMiddle &&
                targetElement.offsetTop + targetElement.offsetHeight > scrollMiddle) {
                navbarLinks.forEach(otherLink => otherLink.classList.remove("active"));
                link.classList.add("active");
            } else if (targetId === "home" && document.getElementById("brands") && window.scrollY < document.getElementById("brands").offsetTop) {
                navbarLinks.forEach(otherLink => otherLink.classList.remove("active"));
                document.querySelector('.navbar a[href="#home"]').classList.add("active");
            }
        });

        isScrolling = false;
    }

    window.addEventListener("scroll", handleScroll);

    // Alert for the "Click Me" button
    if (clickButton) {
        clickButton.addEventListener("click", function() {
            alert("Thank You!");
        });
    }

    // Theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener("click", function() {
            body.classList.toggle("light-theme");
            localStorage.setItem("theme", body.classList.contains("light-theme") ? "light" : "dark");
            themeToggle.textContent = body.classList.contains("light-theme") ? "Dark Mode" : "Light Mode";
        });
    }

    // Check for saved theme preference on page load
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        body.classList.add("light-theme");
        if (themeToggle) {
            themeToggle.textContent = "Dark Mode";
        }
    }

    // Enhanced Contact Form JS
    const contactForm = document.querySelector(".contact-fieldset.contact");
    if (contactForm) {
        const nameInput = contactForm.querySelector("#name");
        const emailInput = contactForm.querySelector("#email");
        const messageInput = contactForm.querySelector("#message");
        const nameError = contactForm.querySelector("#nameError");
        const emailError = contactForm.querySelector("#emailError");
        const messageError = contactForm.querySelector("#messageError");
        const formSuccess = contactForm.querySelector("#formSuccess");
        const submitBtn = contactForm.querySelector(".animated-submit");

        // Helper validation functions
        function validateName() {
            if (nameInput.value.trim().length < 2) {
                nameError.textContent = "Please enter your name.";
                return false;
            }
            nameError.textContent = "";
            return true;
        }
        function validateEmail() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                emailError.textContent = "Please enter a valid email.";
                return false;
            }
            emailError.textContent = "";
            return true;
        }
        function validateMessage() {
            if (messageInput.value.trim().length < 5) {
                messageError.textContent = "Message is too short.";
                return false;
            }
            messageError.textContent = "";
            return true;
        }

        // Live validation
        nameInput.addEventListener("input", validateName);
        emailInput.addEventListener("input", validateEmail);
        messageInput.addEventListener("input", validateMessage);

        // Floating label support for autofill
        [nameInput, emailInput, messageInput].forEach(input => {
            input.addEventListener("blur", function() {
                if (input.value) input.classList.add("not-empty");
                else input.classList.remove("not-empty");
            });
        });

        // Animated submit
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const valid = validateName() & validateEmail() & validateMessage();
            if (!valid) return;

            // Button animation
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";
            setTimeout(() => {
                submitBtn.textContent = "Submit";
                submitBtn.disabled = false;
                formSuccess.textContent = "Thank you for contacting us!";
                formSuccess.classList.add("visible");
                contactForm.reset();
                setTimeout(() => formSuccess.classList.remove("visible"), 2500);
            }, 1200);
        });
    }
});
