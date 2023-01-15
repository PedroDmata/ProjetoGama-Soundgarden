const main = async () => {
    const params = parseQueryString(window.location.search);
  
    if (!params.id) {
      window.location.replace("admin.html"); 
    }
  
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
  
    const etrLoading = document.createElement("tr");
    const etdLoading = document.createElement("td");
    etdLoading.setAttribute("colspan", 5);
    etdLoading.setAttribute("align", "center");
    etdLoading.append("Carregando reservas..."); 
  
    etrLoading.appendChild(etdLoading);
    tbody.appendChild(etrLoading);
  
    const [dataEvent, dataBookings] = await Promise.all([  
      fetch(`${BASE_URL}/events/${params.id}`).then((response) =>
        response.json()
      ),
      fetch(`${BASE_URL}/bookings/event/${params.id}`).then((response) =>
        response.json()
      ),
    ]);
  
    tbody.innerHTML = "";
  
    document.querySelector("#eventoNome").innerHTML = dataEvent?.name;
  
    if (dataBookings.length === 0) {
      const etrNenhumaReserva = document.createElement("tr");
      const etdNenhumaReserva = document.createElement("td");
      etdNenhumaReserva.setAttribute("colspan", 5);
      etdNenhumaReserva.setAttribute("align", "center");
      etdNenhumaReserva.append("Nenhuma reserva encontrada");
  
      etrNenhumaReserva.appendChild(etdNenhumaReserva);
      tbody.appendChild(etrNenhumaReserva);
    }
  
    dataBookings.forEach((row, index) => {
  
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <th scope="row" width="20px">${index + 1}</th>
        <td>${new Date(row.created_at).toLocaleString("pt-br")}</td>
        <td>${row.owner_name}</td>
        <td>${row.owner_email}</td>
        <td>${row.number_tickets}</td>`;
  
      tbody.appendChild(tr);
    });
  };
  
  main();