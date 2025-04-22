document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        fetch('/users/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailInput.value, password: passwordInput.value }),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data || 'Erreur d\'authentification');
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Réponse du serveur:', data);
            // Récupérer le token de la réponse
            const token = data.token;

            // Stocker le token (localStorage est un exemple)
            localStorage.setItem('jwtToken', token);

            // Rediriger vers le tableau de bord
            window.location.href = '/dashboard';
        })
        .catch(error => {
            console.error('Erreur d\'authentification:', error);
            // Ici, tu peux afficher un message d'erreur à l'utilisateur dans ta page login.html
        });
    });
});