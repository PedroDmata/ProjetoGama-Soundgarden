const main = async () => {
    const divEventos = document.querySelector("#eventos");
    divEventos.innerHTML = "";
  
    const data = await fetch(`${BASE_URL}/events`).then((response) =>
      response.json()
    );
  
    data
      .filter((evento) => new Date(evento.scheduled) > new Date())
      .sort((a, b) => new Date(a.scheduled) - new Date(b.scheduled))
      .slice(0, 3)
      .forEach((evento) => {
        const article = document.createElement("article");
        article.setAttribute("class", "evento card p-5 m-3");
  
        article.innerHTML = `
          <h2>${evento.name} - ${new Date(evento.scheduled).toLocaleString()}</h2>
          <h4>${evento.attractions.join(", ")}</h4>
          <p>
            ${evento.description}
          </p>
          <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalReserva" data-bs-id="${
            evento._id
          }" data-bs-name="${evento.name}">reservar ingresso</a>
        `;
  
        divEventos.appendChild(article);
      });
  
    const modalReserva = document.getElementById("modalReserva");
    const modalReservaObj = new bootstrap.Modal(modalReserva);
  
    modalReserva.addEventListener("show.bs.modal", function (event) {
      const button = event.relatedTarget;
      const id = button.getAttribute("data-bs-id");
      const name = button.getAttribute("data-bs-name");
  
      modalReserva.querySelector("#title").textContent = name;
      modalReserva.querySelector("#id").value = id;
    });
  
    modalReserva.addEventListener("hide.bs.modal", function () {
      modalReserva.querySelector(".modal-title").textContent = "";
      modalReserva.querySelector("#id").value = "";
      modalReserva.querySelector("#name").value = "";
      modalReserva.querySelector("#email").value = "";
      modalReserva.querySelector("#number_tickets").value = "";
    });
  
    const formReserva = modalReserva.querySelector("form");
  
    formReserva.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const body = {};
  
      for (i = 0; i < formReserva.elements.length - 1; i++) {
        const item = formReserva.elements[i];
  
        body[item.name] = item.value;
      }
  
      fetch(`${BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then(() => {
          alert("Reserva feita com sucesso");
  
          modalReservaObj.hide();
        })
        .catch((error) => console.log(error.message));
    });
  };
  
  main();