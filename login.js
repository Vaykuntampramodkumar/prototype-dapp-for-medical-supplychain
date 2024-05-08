document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = loginForm.elements.username.value;
        const password = loginForm.elements.password.value;

        // Check if username exists and password matches
        const storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === password) {
            // Redirect to another HTML page
            window.location.href = 'web.html';
        } else {
            loginMessage.textContent = 'Invalid username or password. Please try again.';
        }
    });
});
