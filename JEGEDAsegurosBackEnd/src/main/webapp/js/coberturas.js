class Coberturas {
    constructor() {
        this.state = {
            entities: [], // Initialize entities as an empty array
            mode: '', // Initialize mode
        };
        this.dom = this.render();
        this.modal = new bootstrap.Modal(this.dom.querySelector('#modal'));
        this.dom.querySelector("#create").addEventListener('click', () => this.makenew());
        this.dom.querySelector('#apply').addEventListener('click', () => this.add());
    }

    render() {
        const html = `
      <div id="coberturas">
        <div id="list" class="container">
          <div class="card bg-light">
            <h4 class="card-title mt-3 text-center">Coberturas</h4>
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
                      <th scope="col">Precio Minimo</th>
                      <th scope="col">Precio Porcentual</th>
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
              <img class="img-circle" id="img_logo" src="images/logo.png" style="max-width: 50px; max-height: 50px" alt="logo">
              <span style='margin-left:4em;font-weight: bold;'>Marcas</span>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="modalForm">
              <div class="modal-body">
                <h1>To do</h1>
              </div>
              <div class="modal-footer">
                <button id="apply" type="button" class="btn btn-primary">Apply</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
        const coberturasContainer = document.createElement('div');
        coberturasContainer.innerHTML = html;
        return coberturasContainer;
    }

    list() {
        const request = new Request(`${backend}/coberturas`, {method: 'GET', headers: {}});
        (async () => {
            try {
                const response = await fetch(request);
                if (!response.ok) {
                    errorMessage(response.status);
                    return;
                }
                const coberturas = await response.json();
                this.state.entities = coberturas; // Update entities in the state
                const listing = this.dom.querySelector("#listbody");
                listing.innerHTML = "";
                this.state.entities.forEach(e => this.row(listing, e));
            } catch (error) {
                console.error('Error fetching modelos:', error);
            }
        })();
    }

    row(list, co) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${co.id}</td>
      <td>${co.descripcion}</td>
      <td>${co.costoMinimo}</td>
      <td>${co.costoPorcentual}</td>`;
        list.append(tr);
    }

    makenew() {
        this.reset();
        this.state.mode = 'A'; // Adding
        this.showModal();
    }

    add() {
        // TODO: Validate data, load into entity, invoke backend for adding
        this.list();
        this.reset();
        this.modal.hide();
    }

    // Other methods (load, reset, emptyEntity, update, validate) can be added here
}

// Usage example:
const coberturasTable = new Coberturas();
document.body.appendChild(coberturasTable.dom);
coberturasTable.list(); // Call list() to fetch and display the polizas
