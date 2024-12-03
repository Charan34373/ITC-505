// Function to validate the form
document.getElementById("membershipForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Collect form values
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    let errors = [];

    // Validate first name and last name
    if (!firstName) errors.push("First Name is required.");
    if (!lastName) errors.push("Last Name is required.");

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errors.push("Please enter a valid email address.");

    // Validate passwords
    if (!password) errors.push("Password is required.");
    if (password !== confirmPassword) errors.push("Passwords do not match.");

    // Display errors in pop-up if any
    if (errors.length > 0) {
        alert("Form Errors:\n" + errors.join("\n"));
    } else {
        // If no errors, display success message
        alert(
            `Form Submitted Successfully!\n\nDetails:\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}`
        );
    }
});
