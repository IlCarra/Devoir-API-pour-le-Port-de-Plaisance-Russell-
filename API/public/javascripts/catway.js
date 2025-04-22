document.addEventListener('DOMContentLoaded', () => {
    const catwaysTable = document.getElementById('catwaysTable').getElementsByTagName('tbody')[0];
    const catwayForm = document.getElementById('catwayForm');
    const catwayIdInput = document.getElementById('catwayId');
    const catwayNumberInput = document.getElementById('catwayNumber');
    const catwayTypeInput = document.getElementById('catwayType');
    const catwayStateInput = document.getElementById('catwayState');

    const getCatways = () => {
        fetch('/catways')
            .then(response => response.json())
            .then(data => {
                console.log('Dati restituiti:', data);
                catwaysTable.innerHTML = '';
                data.forEach(catway => {
                    let row = catwaysTable.insertRow();
                    row.insertCell().textContent = catway.catwayNumber;
                    row.insertCell().textContent = catway.catwayType;
                    row.insertCell().textContent = catway.catwayState;
                    let actionCell = row.insertCell();
                    actionCell.innerHTML = `
                        <button onclick="editCatway('${catway._id}')">Modifier</button> 
                        <button onclick="deleteCatway('${catway._id}')">Eliminer</button>
                        <button onclick="window.location.href='/catways/${catway._id}/reservations-page'">Prenotazioni</button>
                    `;
                });
            });
    };

    catwayForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const catwayId = catwayIdInput.value;
        const catway = {
            catwayNumber: catwayNumberInput.value,
            catwayType: catwayTypeInput.value,
            catwayState: catwayStateInput.value
        };
        const method = catwayId ? 'PATCH' : 'POST';
        const url = catwayId ? `/catways/${catwayId}` : '/catways';

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(catway)
        })
        .then(() => {
            getCatways();
            catwayForm.reset();
            catwayIdInput.value = '';
        });
    });

    window.deleteCatway = (id) => {
        fetch(`/catways/${id}`, { method: 'DELETE' }).then(getCatways);
    };

    window.editCatway = (id) => {
        fetch(`/catways/${id}`)
            .then(response => response.json())
            .then(catway => {
                catwayIdInput.value = catway._id;
                catwayNumberInput.value = catway.catwayNumber;
                catwayTypeInput.value = catway.catwayType;
                catwayStateInput.value = catway.catwayState;
            });
    };

    getCatways();
});