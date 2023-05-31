class Polizas {
  constructor() {
    this.state = {
      entities: [], // Initialize entities as an empty array
      mode: '',
    };
    this.dom = this.render();
    this.modal = new bootstrap.Modal(this.dom.querySelector('#modal'));
    this.dom.querySelector('#create').addEventListener('click', () => this.showAddModal()); // Call showAddModal on create button click
    this.dom.querySelector('#search').addEventListener('click', () => this.search());
  }

  render() {
  const html = `
    <div id="polizas">
      <div id="list" class="container">
        <div class="card bg-light">
          <h4 class="card-title mt-3 text-center">Polizas</h4>
          <div class="card-body mx-auto w-75">
            <form id="form">
              <div class="input-group mb-3">
                <span class="input-group-text">Placa</span>
                <input id="name" type="text" class="form-control">
                <div class="btn-toolbar">
                  <div class="btn-group me-2">
                    <button type="button" class="btn btn-primary" id="search">Buscar</button>
                  </div>
                  <div class="btn-group me-2">
                    <button type="button" class="btn btn-primary" id="create">Agregar</button>
                  </div>
                </div>
              </div>
            </form>

            <div class="table-responsive" style="max-height: 300px; overflow: auto">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Placa</th>
                    <th scope="col">Año</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Plazo</th>
                    <th scope="col">Fecha de Inicio</th>
                    <th scope="col">Modelo</th>
                  </tr>
                </thead>
                <tbody id="listbody"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div id="modal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <img class="img-circle" id="img_logo" src="images/logo.png" style="max-width: 50px; max-height: 50px" alt="logo">
              <span style='margin-left:4em;font-weight: bold;'>Poliza</span>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="modal-form">
              <div class="modal-body">
                <div class="mb-3">
                  <label for="selectModelo" class="form-label">Modelo</label>
                  <select id="selectModelo" class="form-select">
                    <!-- Options will be populated dynamically based on selected marca -->
                  </select>
                </div>
                <div class="mb-3">
                  <label for="placa" class="form-label">Placa</label>
                  <input type="text" class="form-control" id="placa" required>
                </div>
                <div class="mb-3">
                  <label for="valorAsegurado" class="form-label">Valor Asegurado</label>
                  <input type="text" class="form-control" id="valorAsegurado" required>
                </div>
                <div class="mb-3">
                  <label for="anno" class="form-label">Año de Fabricación</label>
                  <input type="number" class="form-control" id="anno" required>
                </div>
                <div class="mb-3">
                  <label for="plazoPago" class="form-label">Plazo de Pago</label>
                  <select id="plazoPago" class="form-select" required>
                    <option value="Trimestral">Trimestral</option>
                    <option value="Semestral">Semestral</option>
                    <option value="Anual">Anual</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="fechaInicio" class="form-label">Fecha de Inicio</label>
                  <input type="date" class="form-control" id="fechaInicio" required>
                </div>
                <div class="mb-3">
    <label class="form-label">Coberturas</label>
    <div id="checkboxGroup">
      <!-- Checkboxes will be populated dynamically -->
    </div>
  </div>
              </div>
              <div class="modal-footer">
                <button id="apply" type="button" class="btn btn-primary">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  const polizasContainer = document.createElement('div');
  polizasContainer.innerHTML = html;

  // Add event listener to the "Agregar" button
  const createButton = polizasContainer.querySelector('#create');
  createButton.addEventListener('click', () => this.showAddModal());

  return polizasContainer;
}


  list() {
    const request = new Request(`${backend}/polizas/cliente`, { method: 'GET', headers: {} });
    (async () => {
      try {
        const response = await fetch(request);
        if (!response.ok) {
          errorMessage(response.status);
          return;
        }
        const polizas = await response.json();
        this.state.entities = polizas; // Update entities in the state
        const listing = this.dom.querySelector('#listbody');
        listing.innerHTML = '';
        this.state.entities.forEach((e) => this.row(listing, e));
      } catch (error) {
        console.error('Error fetching polizas:', error);
      }
    })();
  }

  row(list, p) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.numeroPlaca}</td>
      <td>${p.anno}</td>
      <td>${p.valorAsegurado}</td>
      <td>${p.plazoPago}</td>
      <td>${p.fechaInicio}</td>
      <td>${p.modelo.descripcion}</td>`;
    list.append(tr);
  }


showAddModal() {
  // Reset modal form inputs
  const modalForm = this.dom.querySelector('#modal-form');
  modalForm.reset();

  // Fetch modelos from the database
  const requestModelos = new Request(`${backend}/modelos`, { method: 'GET', headers: {} });

  fetch(requestModelos)
    .then(async (responseModelos) => {
      if (!responseModelos.ok) {
        errorMessage(responseModelos.status);
        return;
      }

      const modelos = await responseModelos.json();

      // Populate selectModelo dropdown with modelos and their marca
      const selectModelo = modalForm.querySelector('#selectModelo');
      selectModelo.innerHTML = '';
      modelos.forEach((modelo) => {
        const optionModelo = document.createElement('option');
        optionModelo.value = modelo.id;
        optionModelo.textContent = `${modelo.descripcion} - ${modelo.marca.descripcion}`;
        selectModelo.appendChild(optionModelo);
      });

      // Fetch coberturas from the database
      const requestCoberturas = new Request(`${backend}/coberturas`, { method: 'GET', headers: {} });

      return fetch(requestCoberturas);
    })
    .then(async (responseCoberturas) => {
      if (!responseCoberturas.ok) {
        errorMessage(responseCoberturas.status);
        return;
      }

      const coberturas = await responseCoberturas.json();

      // Populate checkbox group with coberturas
      const checkboxGroup = modalForm.querySelector('#checkboxGroup');
      checkboxGroup.innerHTML = '';
      coberturas.forEach((cobertura) => {
        const checkbox = document.createElement('div');
        checkbox.innerHTML = `
          <input type="checkbox" id="cobertura_${cobertura.id}" value="${cobertura.id}">
          <label for="cobertura_${cobertura.id}">${cobertura.descripcion}</label>
          <div>Costo Minimo: ${cobertura.costoMinimo}</div>
          <div>Costo Porcentual: ${cobertura.costoPorcentual}</div>
          <div>Categoria: ${cobertura.categoria.descripcion}</div>
          <!-- Add additional attributes as needed -->
        `;
        checkboxGroup.appendChild(checkbox);
      });

      // Show the modal
      this.modal.show();
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}



  createPoliza(data) {
    const request = new Request(`${backend}/polizas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    (async () => {
      try {
        const response = await fetch(request);
        if (!response.ok) {
          errorMessage(response.status);
          return;
        }
        this.modal.hide();
        this.list(); // Refresh the polizas list after creating a new poliza
      } catch (error) {
        console.error('Error creating poliza:', error);
      }
    })();
  }

  search() {
    const searchInput = this.dom.querySelector('#name').value;
    const request = new Request(`${backend}/polizas/findByPlaca/${searchInput}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    (async () => {
      try {
        const response = await fetch(request);
        if (!response.ok) {
          errorMessage(response.status);
          return;
        }
        const polizas = await response.json();
        const listing = this.dom.querySelector('#listbody');
        listing.innerHTML = '';
        polizas.forEach((p) => this.row(listing, p));
      } catch (error) {
        console.error('Error searching polizas:', error);
      }
    })();
  }
}

// Usage example:
const polizasTable = new Polizas();
document.body.appendChild(polizasTable.dom);
polizasTable.list(); // Call list() to fetch and display the polizas

// Apply button click event listener
polizasTable.dom.querySelector('#apply').addEventListener('click', () => {
  const selectModelo = polizasTable.dom.querySelector('#selectModelo');
  const placaInput = polizasTable.dom.querySelector('#placaInput');
  const valorInput = polizasTable.dom.querySelector('#valorInput');
  const yearInput = polizasTable.dom.querySelector('#yearInput');
  const plazoInput = polizasTable.dom.querySelector('#plazoInput');
  const startDateInput = polizasTable.dom.querySelector('#startDateInput');

  // Create a new poliza object from the form data
  const newPoliza = {
    modeloId: selectModelo.value,
    numeroPlaca: placaInput.value,
    valorAsegurado: valorInput.value,
    anno: yearInput.value,
    plazoPago: plazoInput.value,
    fechaInicio: startDateInput.value,
  };

  polizasTable.createPoliza(newPoliza);
});
