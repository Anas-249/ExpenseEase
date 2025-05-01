document.addEventListener("DOMContentLoaded", () => {
    const formTitle = document.getElementById("form-title");
    const submitBtn = document.getElementById("submit-btn");
    const toggleText = document.getElementById("toggle-text");
    const toggleLink = document.getElementById("toggle-link");
    const confirmPasswordField = document.getElementById("confirm-password-field");
    const usernameField = document.getElementById("username-field");
    const emailField = document.getElementById("email-field");
    const form = document.getElementById("toggleForm");
    const message = document.getElementById("message");
  
    let isLogin = true;
  

    toggleLink.addEventListener("click", () => {
        isLogin = !isLogin;
  
        if (isLogin) {
            formTitle.textContent = "Sign In";
            submitBtn.textContent = "Sign In";
            toggleText.innerHTML = "Don't have an account? <span id='toggle-link'>Sign Up</span>";
            confirmPasswordField.style.display = "none";
            usernameField.style.display = "none";
            emailField.style.display = "block";
        } else {
            formTitle.textContent = "Sign Up";
            submitBtn.textContent = "Sign Up";
            toggleText.innerHTML = "";
            confirmPasswordField.style.display = "block";
            usernameField.style.display = "block";
            emailField.style.display = "block";
        }
    });
  

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const username = document.getElementById("username").value;
  
        if (!isLogin) {
            // Sign Up validation
            if (password !== confirmPassword) {
                message.textContent = "Passwords do not match!";
                return;
            }
            // Save new user to local storage
            const userData = { username, email, password };
            localStorage.setItem("userData", JSON.stringify(userData));
            message.textContent = "Sign up successful.";
            form.reset();
            setTimeout(() => {
                toggleLink.click(); // Switch to Sign In view
            }, 1000);
        } else {
            // Login validation
            const storedData = JSON.parse(localStorage.getItem("userData"));
            if (storedData && storedData.email === email && storedData.password === password) {
                message.textContent = `Welcome, ${storedData.username}`;
                setTimeout(() => {
                    window.location.href = "base.html"; // Redirect to base.html
                }, 1000); // Optional delay to display the welcome message
            } else {
                message.textContent = "Incorrect email or password!";
            }
        }
    });
  });