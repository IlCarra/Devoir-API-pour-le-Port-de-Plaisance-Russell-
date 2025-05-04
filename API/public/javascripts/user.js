document.addEventListener('DOMContentLoaded', () => {
    const usersTableBody = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
    const userForm = document.getElementById('userForm');
    const userIdInput = document.getElementById('userId');
    const nameInput = document.getElementById('name');
    const firstnameInput = document.getElementById('firstname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const loadUsers = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch('/users', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const users = await response.json();
            displayUsers(users);
        } catch (error) {
            console.error('Erreur lors du chargement des utilisateurs:', error);
        }
    };

    const displayUsers = (users) => {
        usersTableBody.innerHTML = '';
        users.forEach(user => {
            const row = usersTableBody.insertRow();
            row.insertCell().textContent = user.name;
            row.insertCell().textContent = user.firstname || '';
            row.insertCell().textContent = user.email;
            const actionsCell = row.insertCell();
            actionsCell.innerHTML = `
                <button onclick="editUser('${user.email}')">Modifier</button>
                <button onclick="deleteUser('${user.email}')">Supprimer</button>
            `;
        });
    };

    window.editUser = async (email) => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`/users/${email}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const user = await response.json();
            userIdInput.value = user.email;
            nameInput.value = user.name;
            firstnameInput.value = user.firstname || '';
            emailInput.value = user.email;
            emailInput.readOnly = true;
            passwordInput.value = '';
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        }
    };

    window.deleteUser = async (email) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await fetch(`/users/${email}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                loadUsers();
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'utilisateur:', error);
            }
        }
    };

    userForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const userData = {
            name: nameInput.value,
            firstname: firstnameInput.value,
            email: emailInput.value,
            password: passwordInput.value // Gérer le cas où le mot de passe n'est pas modifié
        };

        const method = userIdInput.value ? 'PATCH' : 'POST';
        const url = userIdInput.value ? `/users/${userIdInput.value}` : '/users/add';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('jwtToken') ? `Bearer ${localStorage.getItem('jwtToken')}` : ''
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', errorData);
                // Afficher un message d'erreur à l'utilisateur ici
                return;
            }

            loadUsers();
            userForm.reset();
            userIdInput.value = '';
            emailInput.readOnly = false;
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
        }
    });

    loadUsers();
});