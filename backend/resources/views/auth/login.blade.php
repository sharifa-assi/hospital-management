<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
    <h2>Login</h2>
    <form id="loginForm">
        <input type="email" id="email" name="email" placeholder="Email" required><br>
        <input type="password" id="password" name="password" placeholder="Password" required><br>
        <button type="submit">Login</button>
    </form>

    <div id="error-message" style="color:red; display:none;"></div>

    <script>
        // Handle the login form submission using AJAX
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();  // Prevent default form submission

            // Get the values from the form
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Send login request to the API using Axios
            axios.post('/api/login', {
                email: email,
                password: password,
            })
            .then(function (response) {
                // On success, store the token and redirect to the dashboard or show success
                console.log('Login successful', response.data);
                localStorage.setItem('token', response.data.token);  // Store the token
                window.location.href = '/dashboard';  // Redirect to the dashboard
            })
            .catch(function (error) {
                // On error, show the error message
                const errorMessage = error.response.data.message || 'An error occurred';
                document.getElementById('error-message').style.display = 'block';
                document.getElementById('error-message').innerText = errorMessage;
            });
        });
    </script>
</body>
</html>
