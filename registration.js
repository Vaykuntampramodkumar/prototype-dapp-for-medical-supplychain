document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const registrationMessage = document.getElementById('registrationMessage');

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newUsername = registrationForm.elements.username.value;
        const newPassword = registrationForm.elements.password.value;

        // Check if username is already taken
        if (localStorage.getItem(newUsername)) {
            registrationMessage.textContent = 'Username already exists. Please choose a different username.';
        } else {
            // Store new username and password in localStorage
            localStorage.setItem(newUsername, newPassword);
            registrationMessage.textContent = 'Registration successful. You can now login.';
            registrationForm.reset(); // Clear the form
        }
    });
});
