
        function toggleForm(formType) {
            document.querySelector('.signin').style.display = 'none';
            document.querySelector('.login').style.display = 'none';
            document.querySelector('.forgot-password-form').style.display = 'none';

            if (formType === 'signin') {
                document.querySelector('.signin').style.display = 'block';
            } else if (formType === 'login') {
                document.querySelector('.login').style.display = 'block';
            } else if (formType === 'forgotPassword') {
                document.querySelector('.forgot-password-form').style.display = 'block';
            }
        }

        document.getElementById("signupForm").addEventListener("submit", async (event) => {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://localhost:5000/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password }),
                });

                const result = await response.json();
                alert(result.message);
            } catch (error) {
                alert("Error: " + error.message);
            }
        });

        document.getElementById("loginForm").addEventListener("submit", async (event) => {
            event.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            try {
                const response = await fetch("http://localhost:5000/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                const result = await response.json();
                alert(result.message);
            } catch (error) {
                alert("Error: " + error.message);
            }
        });

        document.getElementById("forgotPasswordForm").addEventListener("submit", async (event) => {
            event.preventDefault();
            const email = document.getElementById("forgotEmail").value;

            try {
                const response = await fetch("http://localhost:5000/forgot-password", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                });

                const result = await response.json();
                alert(result.message);

                if (response.ok) {
                    document.querySelector('.forgot-password-form').style.display = 'none';
                    document.querySelector('.login').style.display = 'block';
                }
            } catch (error) {
                alert("Error: " + error.message);
            }
        });
    