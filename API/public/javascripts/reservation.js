document.addEventListener('DOMContentLoaded', () => {
    const reservationsTable = document.getElementById('reservationsTable').getElementsByTagName('tbody')[0];
    const reservationForm = document.getElementById('reservationForm');
    const reservationIdInput = document.getElementById('reservationId');
    const catwayNumberInput = document.getElementById('catwayNumber');
    const clientNameInput = document.getElementById('clientName');
    const boatNameInput = document.getElementById('boatName');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    let currentCatwayId = null; 

    const getCatwayIdFromUrl = () => {
        const pathSegments = window.location.pathname.split('/');
        const catwayIndex = pathSegments.indexOf('catways') + 1;
        return pathSegments[catwayIndex];
    };

    const loadReservations = (catwayId) => {
        if (!catwayId) {
            console.error('ID of the catway not found in the\'URL.');
            return;
        }
        currentCatwayId = catwayId;
        fetch(`/catways/${catwayId}/reservations`)
            .then(response => response.json())
            .then(data => {
                console.log('Reservations chargé:', data);
                reservationsTable.innerHTML = '';
                data.forEach(reservation => {
                    const row = reservationsTable.insertRow();
                    row.insertCell().textContent = reservation._id;
                    row.insertCell().textContent = reservation.catwayNumber;
                    row.insertCell().textContent = reservation.clientName;
                    row.insertCell().textContent = reservation.boatName;
                    row.insertCell().textContent = new Date(reservation.startDate).toLocaleString();
                    row.insertCell().textContent = new Date(reservation.endDate).toLocaleString();
                    const actionsCell = row.insertCell();
                    actionsCell.innerHTML = `
                        <button onclick="editReservation('${reservation._id}')">Modifier</button>
                        <button onclick="deleteReservation('${reservation._id}')">Eliminer</button>
                    `;
                });
            })
            .catch(error => console.error('Erreur dans le chargement des reservations:', error));
    };

    const initialCatwayId = getCatwayIdFromUrl();
    if (initialCatwayId) {
        loadReservations(initialCatwayId);
    } else {
        console.error('Impossible obtenir l\'ID du catway.');
    }

    window.editReservation = (reservationId) => {
        fetch(`/catways/${currentCatwayId}/reservations/${reservationId}`)
            .then(response => response.json())
            .then(reservation => {
                reservationIdInput.value = reservation._id;
                catwayNumberInput.value = reservation.catwayNumber;
                clientNameInput.value = reservation.clientName;
                boatNameInput.value = reservation.boatName;
                startDateInput.value = new Date(reservation.startDate).toISOString().slice(0, 16);
                endDateInput.value = new Date(reservation.endDate).toISOString().slice(0, 16);
            })
            .catch(error => console.error('Erreur dans la recuperation des details de la reservation:', error));
    };

    window.deleteReservation = (reservationId) => {
        if (confirm('Vous etes sur de eliminer cette reservation?')) {
            fetch(`/catways/${currentCatwayId}/reservations/${reservationId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    loadReservations(currentCatwayId); 
                } else {
                    return response.json().then(data => {
                        throw new Error(data.message || 'Erreur dans l\'elimination de la reservation');
                    });
                }
            })
            .catch(error => console.error('Erreur dans l\'elimination de la reservation:', error));
        }
    };

    reservationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const reservationData = {
            catwayNumber: catwayNumberInput.value,
            clientName: clientNameInput.value,
            boatName: boatNameInput.value,
            startDate: startDateInput.value,
            endDate: endDateInput.value
        };

        const method = reservationIdInput.value ? 'PUT' : 'POST';
        const url = reservationIdInput.value
            ? `/catways/${currentCatwayId}/reservations/${reservationIdInput.value}`
            : `/catways/${currentCatwayId}/reservations`;

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Res du serveur:', data);
            loadReservations(currentCatwayId);
            reservationForm.reset();
            reservationIdInput.value = '';
        })
        .catch(error => console.error('Erreur pendans l\'elimination/modification de la reservation:', error));
    });
});