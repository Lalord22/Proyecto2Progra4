class Modelos {
    constructor() {
        this.state = {
            entities: [], // Initialize entities as an empty array
            mode: '', // Initialize mode
        };
        this.dom = this.render();
        this.modal = new bootstrap.Modal(this.dom.querySelector('#modal'));
        this.dom.querySelector("#create").addEventListener('click', () => this.makenew());
    }

    render() {
        const html = `
      <div id="modelos">
      <div id="list" class="container">
        <div class="card bg-light">
          <h4 class="card-title mt-3 text-center">Modelos</h4>
          <div class="card-body mx-auto w-75">
            <form id="form">
              <div class="btn-group me-2">
                <button type="button" class="btn btn-primary" id="create">Agregar</button>
              </div>
            </form>
            <div class="table-responsive" style="max-height: 300px; overflow: auto">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Marca</th>
                  </tr>
                </thead>
                <tbody id="listbody"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="modal" class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <img class="img-circle" id="img_logo" src="images/logo3.png" style="max-width: 100px; max-height: 100px" alt="logo">
            <h5 class="modal-title">Registrar Modelo</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form id="modalForm">
            <div class="modal-body">
              <div class="mb-3">
                <label for="marcaSelect" class="form-label">Marca</label>
                <select id="marcaSelect" class="form-select">
                  <!-- Marcas options will be populated dynamically -->
                </select>
              </div>
              <div class="mb-3">
                <label for="descriptionInput" class="form-label">Descripción</label>
                <input type="text" id="descriptionInput" class="form-control">
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
        const modelosContainer = document.createElement('div');
        modelosContainer.innerHTML = html;
        const applyButton = modelosContainer.querySelector('#apply');
        applyButton.addEventListener('click', () => this.add());
        return modelosContainer;
    }
    
    getMarcaById(marcaId) {
      const request = new Request(`${backend}/modelos/${marcaId}`, { method: 'GET', headers: {} });
      return fetch(request)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch marca by ID');
          }
          return response.json();
        })
        .catch(error => {
          console.error('Error fetching marca by ID:', error);
          throw error;
        });
    }
    
    list() {
        const request = new Request(`${backend}/modelos`, {method: 'GET', headers: {}});
        (async () => {
            try {
                const response = await fetch(request);
                if (!response.ok) {
                    errorMessage(response.status);
                    return;
                }
                const modelos = await response.json();
                this.state.entities = modelos; // Update entities in the state
                const listing = this.dom.querySelector("#listbody");
                listing.innerHTML = "";
                this.state.entities.forEach(e => this.row(listing, e));
                const modelo = e;
                const marca = await this.getMarcaById(modelos.id);
                modelo.marca = marca;
                this.row(listing, modelo);
            } catch (error) {
                console.error('Error fetching modelos:', error);
            }
        })();
    }

    row(list, mo) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${mo.id}</td>
      <td>${mo.descripcion}</td>
      <td>${mo.marca.descripcion}</td>`;
        list.append(tr);
    }

   makenew() {
        const marcaSelect = this.dom.querySelector('#marcaSelect');
        marcaSelect.innerHTML = ''; // Clear existing options

        // Fetch marcas from the endpoint
        fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/marcas')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch marcas');
            }
            return response.json();
          })
          .then((marcas) => {
            // Populate marca options
            marcas.forEach((marca) => {
              const option = document.createElement('option');
              option.value = marca.id;
              option.textContent = marca.descripcion;
              marcaSelect.appendChild(option);
            });

            // Display the modal
            this.modal.show();

            // Add event listener to the apply button
            const applyButton = this.dom.querySelector('#apply');
            applyButton.addEventListener('click', () => {
              const marcaId = marcaSelect.value;
              this.add(marcaId);
            });
          })
          .catch((error) => {
            console.error('Error fetching marcas:', error);
          });
      }


    add(marcaId) {
        const descriptionInput = this.dom.querySelector('#descriptionInput');
        const description = descriptionInput.value;
        const newModelo = {
          marca: {
                      id: marcaId
                  },  
          descripcion: description,
        };

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newModelo),
        };

        fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/modelos', requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to add modelo');
            }
            return response.json();
          })
          .then((data) => {
            // Handle successful response from the backend
            console.log('Modelo added successfully:', data);
            this.reset();
            this.modal.hide();
            this.list(); // Refresh the coberturas list after adding a new one
          })
          .catch((error) => {
            console.error('Error adding modelos:', error);
          });
    }

    // Other methods (load, reset, emptyEntity, update, validate) can be added here
}

const modelosTable = new Modelos();
document.body.appendChild(modelosTable.dom);
modelosTable.list(); // Call list() to fetch and display the modelos



