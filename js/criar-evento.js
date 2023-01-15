

const formSelector = document.querySelector('#formulario')
console.log(formSelector);

formSelector.addEventListener('submit', (event) => {
    event.preventDefault();

    const formObject = new FormData(formSelector);

    const attractionsArray = formObject.get('atracoes-input').split(', ');
  
    const body = {
        "name": formObject.get('nome-input'),
        "poster": inputBanner.value,
        "attractions": attractionsArray,
        "description": formObject.get('descricao-input'),
        "scheduled": formObject.get('data-input'),
        "number_tickets": formObject.get('lotacao-input')
    }


    fetch('https://soundgarden-api.deta.dev/events ', {
        "method": "POST",
        "headers": { "content-type": "application/json" },
        "body": JSON.stringify(body)
    }).then( response => console.log(response)
    ).then( ()=> {
        alert("Evento criado com sucesso!")
        window.location.replace("admin.html");
        }
    ).catch( error => console.error(error) );

});
