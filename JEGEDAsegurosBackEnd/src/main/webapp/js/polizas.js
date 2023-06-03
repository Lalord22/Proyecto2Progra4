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
                    <th scope="col">Auto</th>
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
        const request = new Request(`${backend}/polizas/cliente`, {method: 'GET', headers: {}});
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
      <td>${p.modelo.descripcion}</td>
      <td><img class="carro" src="${backend}/modelos/${p.modelo.id}/carro"></td>`;
        
         // Agrega el evento de clic a la fila de la tabla
        tr.addEventListener('click', () => this.showPolizaPopup(p));

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

      // Create a map to store the unique combination of marca and modelos
      const marcaModeloMap = new Map();

      // Group modelos by marca
      modelos.forEach((modelo) => {
        const marcaId = modelo.marca.id;
        if (!marcaModeloMap.has(marcaId)) {
          marcaModeloMap.set(marcaId, {
            marcaDescripcion: modelo.marca.descripcion,
            modelos: [],
          });
        }
        marcaModeloMap.get(marcaId).modelos.push(modelo);
      });

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

      // Fetch cliente information from the server
      fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/clientes/cliente')
        .then((responseCliente) => {
          if (!responseCliente.ok) {
            errorMessage(responseCliente.status);
            return;
          }

          return responseCliente.json();
        })
        .then((cliente) => {
          // Show the modal
          this.modal.show();

          // Bind the createPoliza method to the "Registrar" button click event
          const registrarButton = modalForm.querySelector('#apply');
          registrarButton.addEventListener('click', () => {
            const selectModelo = modalForm.querySelector('#selectModelo');
            const modeloSelected = selectModelo.value;
            const placaInput = modalForm.querySelector('#placa');
            const valorAseguradoInput = modalForm.querySelector('#valorAsegurado');
            const annoInput = modalForm.querySelector('#anno');
            const plazoPagoSelect = modalForm.querySelector('#plazoPago');
            const fechaInicioInput = modalForm.querySelector('#fechaInicio');

            // Create an array of selected coberturas
            const coberturasCheckboxList = modalForm.querySelectorAll('input[type="checkbox"]:checked');
            const coberturaIds = Array.from(coberturasCheckboxList).map((checkbox) => checkbox.value);

            // Fetch the selected coberturas from the database
            const fetchCoberturas = coberturaIds.map((coberturaId) => {
              const requestCobertura = new Request(`${backend}/coberturas/${coberturaId}`, {
                method: 'GET',
                headers: {},
              });
              return fetch(requestCobertura).then((response) => response.json());
            });

            // Fetch the selected modelo from the database
            const requestModelo = new Request(`${backend}/modelos/${modeloSelected}`, { method: 'GET', headers: {} });

            Promise.all([fetch(requestModelo), ...fetchCoberturas])
              .then(async ([responseModelo, ...selectedCoberturas]) => {
                if (!responseModelo.ok) {
                  errorMessage(responseModelo.status);
                  return;
                }

                const modelo = await responseModelo.json();

                // Create a new poliza object from the form data
                const newPoliza = {
                    id:0,
                  modelo: modelo,
                  numeroPlaca: placaInput.value,
                  valorAsegurado: parseFloat(valorAseguradoInput.value),
                  anno: annoInput.value,
                  plazoPago: plazoPagoSelect.value,
                  fechaInicio: fechaInicioInput.value,
                  coberturas: selectedCoberturas,
                  cliente: cliente,
                };

                // Fetch the costoTotal from the backend
                const requestCostoTotal = new Request(`${backend}/polizas/calcular`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newPoliza),
                });

                return fetch(requestCostoTotal)
                  .then((responseCostoTotal) => {
                    if (!responseCostoTotal.ok) {
                      errorMessage(responseCostoTotal.status);
                      throw new Error('Failed to calculate costoTotal');
                    }
                    return responseCostoTotal.json();
                  })
                  .then((costoTotal) => {
                    // Add the costoTotal to the poliza object
                    newPoliza.costoTotal = costoTotal;

                    // Call the createPoliza method with the new poliza object
                    this.createPoliza(newPoliza);
                  })
                  .catch((error) => {
                    console.error('Error calculating costoTotal:', error);
                  });
              })
              .catch((error) => {
                errorMessage(error.message);
              });
          });
        })
        .catch((error) => {
          errorMessage(error.message);
        });
    })
    .catch((error) => {
      errorMessage(error.message);
    });
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
   


    createPoliza(poliza) {
  // Show summary popup
  this.showSummaryPopup(poliza)
    .then((confirmed) => {
      if (confirmed) {
        // User confirmed, proceed with creating the poliza
        const request = new Request(`${backend}/polizas/agregar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(poliza),
        });

        fetch(request)
          .then((response) => {
            if (!response.ok) {
              errorMessage(response.status);
              throw new Error('Failed to create poliza');
            }
            this.modal.hide();
            this.list(); // Refresh the polizas list after creating a new poliza

            // Close all modals
            this.closeAllModals();
          })
          .catch((error) => {
            console.error('Error creating poliza:', error);
          });
      } else {
        // User canceled, do nothing
      }
    })
    .catch((error) => {
      console.error('Error showing summary popup:', error);
    });
}

closeAllModals() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach((modal) => {
    const bsModal = bootstrap.Modal.getInstance(modal);
    if (bsModal) {
      bsModal.hide();
    }
  });
}

  showPolizaPopup(poliza) {
  // Crear el contenido HTML del popup con los detalles de la póliza
  const html = `
    <div class="modal fade" id="poliza-modal" tabindex="-1" role="dialog" aria-labelledby="poliza-modal-label" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="poliza-modal-label">Detalles de la Póliza</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>ID: ${poliza.id}</p>
            <p>Placa: ${poliza.numeroPlaca}</p>
            <p>Año: ${poliza.anno}</p>
            <p>Valor Asegurado: ${poliza.valorAsegurado}</p>
            <p>Plazo de Pago: ${poliza.plazoPago}</p>
            <p>Fecha de Inicio: ${poliza.fechaInicio}</p>
            <p>Modelo: ${poliza.modelo.descripcion}</p>
          </div>
        </div>
      </div>
    </div>
  `;

    // Agregar el popup al DOM
    const polizaPopup = document.createElement('div');
    polizaPopup.innerHTML = html;
    document.body.appendChild(polizaPopup);

    // Mostrar el popup
    const modal = new bootstrap.Modal(polizaPopup.querySelector('.modal'));
    modal.show();

    // Obtener el botón de cierre del modal
    const closeButton = polizaPopup.querySelector('.modal-header .close');

    // Agregar un evento de clic al botón de cierre para cerrar el modal
    closeButton.addEventListener('click', () => {
      modal.hide(); // Ocultar el modal al hacer clic en el botón de cierre
    });
    // Eliminar el popup del DOM al cerrarlo
    polizaPopup.querySelector('.modal').addEventListener('hidden.bs.modal', () => {
      document.body.removeChild(polizaPopup);
    });

  }

    showSummaryPopup(data) {
        return new Promise((resolve, reject) => {
            const html = `
      <div class="modal fade" id="summary-modal" tabindex="-1" role="dialog" aria-labelledby="summary-modal-label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="summary-modal-label">Summary</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="close-button">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p><strong>Modelo:</strong> ${data.modelo.descripcion}</p>
              <p><strong>Placa:</strong> ${data.numeroPlaca}</p>
              <p><strong>Valor Asegurado:</strong> ${data.valorAsegurado}</p>
              <p><strong>Año de Fabricación:</strong> ${data.anno}</p>
              <p><strong>Plazo de Pago:</strong> ${data.plazoPago}</p>
              <p><strong>Fecha de Inicio:</strong> ${data.fechaInicio}</p>
               <p><strong>Costo Total:</strong> ${data.costoTotal}</p>
            </div>
            <div class="modal-footer">
              <button id="cancel-button" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button id="confirm-button" type="button" class="btn btn-primary">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    `;
            const summaryPopup = document.createElement('div');
    summaryPopup.innerHTML = html;

    // Show the summary popup
    const summaryModal = new bootstrap.Modal(summaryPopup.querySelector('#summary-modal'));
    summaryModal.show();
    
    

    // Add event listener to the confirm button
    const confirmButton = summaryPopup.querySelector('#confirm-button');
    confirmButton.addEventListener('click', () => {
      summaryModal.hide();
      resolve(true); // User confirmed
      cleanup(); // Clean up the popup element from the DOM
    });

    // Add event listener to the cancel button
    const cancelButton = summaryPopup.querySelector('#cancel-button');
    cancelButton.addEventListener('click', () => {
      this.closeAllModals();
      summaryModal.hide();
      resolve(false); // User canceled
      cleanup(); // Clean up the popup element from the DOM
    });
    
     const closeButton = summaryPopup.querySelector('#close-button');
    closeButton.addEventListener('click', () => {
      this.closeAllModals();
      summaryModal.hide();
      resolve(false); // User canceled
      cleanup(); // Clean up the popup element from the DOM
    });

    // Cleanup function
    const cleanup = () => {
      confirmButton.removeEventListener('click', cleanup);
      cancelButton.removeEventListener('click', cleanup);
      summaryModal.dispose(); // Dispose the modal
      summaryPopup.remove(); // Remove the popup element from the DOM
    };

    // Cleanup when the modal is hidden
    summaryModal._element.addEventListener('hidden.bs.modal', cleanup);

    document.body.appendChild(summaryPopup);
  });
           
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
        modelo: selectModelo.value,
        numeroPlaca: placaInput.value,
        valorAsegurado: valorInput.value,
        anno: yearInput.value,
        plazoPago: plazoInput.value,
        fechaInicio: startDateInput.value,
    };




    polizasTable.createPoliza(newPoliza);
});
