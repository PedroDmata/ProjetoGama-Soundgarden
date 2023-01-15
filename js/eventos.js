const eventsContainer = document.querySelector('#events-container');

function enviarReserva(event){
    event.preventDefault();
    const id = event.target.dataset.id;
    const nameSelector = document.querySelector('#nome');
    const emailSelector = document.querySelector('#email');
    const numberTSelector = document.querySelector('#number_tickets');
    const modalReserva = document.getElementById("modalReserva");
    const modalReservaObj = new bootstrap.Modal(modalReserva);
    
    const body = {
        owner_name: nameSelector.value,
        owner_email: emailSelector.value,
        number_tickets: numberTSelector.value,
        event_id: id
    }

    fetch('https://soundgarden-api.deta.dev/bookings', {
                method: "POST", 
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"},
                body: JSON.stringify(body)
                })
                .then((response) => {
                    alert("Reserva feita com sucesso");

                    modalReservaObj.hide();
                })
                .catch((error) => console.log(error.message));
}

function createElementFromEvent(data) {
    data.forEach((event) => {
        const article = document.createElement('article');
        article.classList.add('evento');
        article.classList.add('card');
        article.classList.add('p-5');
        article.classList.add('m-3');


        const h2 = document.createElement('h2');
        const Name = event.name;
        const Date = event.scheduled.substring(0, 10).replaceAll('-', '/');
        h2.innerText = Name + " - " + Date;

        const h4 = document.createElement('h4');
        h4.innerText = event.attractions.join(', ');

        const p = document.createElement('p');
        p.innerText = event.description;

        const linkButton = document.createElement('a');
        linkButton.classList.add('btn');
        linkButton.classList.add('btn-primary');
        linkButton.innerText = 'reservar ingresso';
        linkButton.setAttribute('data-bs-toggle', "modal");
        linkButton.setAttribute('data-bs-target', "#modalReserva");
        linkButton.setAttribute('data-id', event._id);
        linkButton.setAttribute('data-name', Name);
        linkButton.addEventListener("click", (event) => {
            criarModal(event)
        });


        article.append(h2, h4, p, linkButton);


        const divContainer = document.createElement('div');
        divContainer.setAttribute('id', 'div-container');

        eventsContainer.append(article);
    })

    function criarModal(evento) {
        const button = evento.target;

        document.querySelector("#title").innerText = button.dataset.name;
        
        const botaoConfirmar = document.querySelector('#confirmar');
        botaoConfirmar.setAttribute('data-id', button.dataset.id);
        botaoConfirmar.addEventListener('click', (event) => {
            enviarReserva(event)
        });      
    };
};


fetch('https://soundgarden-api.deta.dev/events', {
    "method": "GET",
}).then(response => { return response.json() }
).then(data => createElementFromEvent(data)
).catch(error => console.log(error));
