document.addEventListener('DOMContentLoaded', () => {
    const userNameSpan = document.getElementById('user-name');
    const userEmailSpan = document.getElementById('user-email');
    const currentDateSpan = document.getElementById('current-date');
    const reservationsTableBody = document.getElementById('reservationsTable').getElementsByTagName('tbody')[0];
    const logoutBtn = document.getElementById('logoutBtn');

    const token = localStorage.getItem('jwtToken');

    const fetchUserInfo = async () => {
        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userEmail = decodedToken.user.email;

            const response = await fetch(`/users/${userEmail}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                console.error('Erreur lors de la récupération des informations utilisateur:', response.status);
                return;
            }

            const userData = await response.json();
            userNameSpan.textContent = userData.name + ' ' + (userData.firstname || '');
            userEmailSpan.textContent = userData.email;

        } catch (error) {
            console.error('Erreur lors de la récupération des informations utilisateur:', error);
        }
    };

    const displayCurrentDate = () => {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateSpan.textContent = now.toLocaleDateString('fr-FR', options);
    };

    const fetchCurrentReservations = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch('/catways/reservations/current', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                console.error('Erreur lors de la récupération des réservations:', response.status);
                return;
            }

            const reservations = await response.json();
            displayReservations(reservations);

        } catch (error) {
            console.error('Erreur lors de la récupération des réservations:', error);
        }
    };

    const displayReservations = (reservations) => {
        reservationsTableBody.innerHTML = '';
        reservations.forEach(reservation => {
            const row = reservationsTableBody.insertRow();
            row.insertCell().textContent = reservation._id;
            row.insertCell().textContent = reservation.catwayNumber;
            row.insertCell().textContent = reservation.clientName;
            row.insertCell().textContent = reservation.boatName;
            row.insertCell().textContent = new Date(reservation.startDate).toLocaleDateString('fr-FR');
            row.insertCell().textContent = new Date(reservation.endDate).toLocaleDateString('fr-FR');
        });
    };

    logoutBtn.addEventListener('click', async () => {
        try {
            localStorage.removeItem('jwtToken');
            window.location.href = '/';
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);

        }
    });

    if (token) {
        fetchUserInfo();
        displayCurrentDate();
        fetchCurrentReservations();
    } else {

        window.location.href = '/login';
    }
});