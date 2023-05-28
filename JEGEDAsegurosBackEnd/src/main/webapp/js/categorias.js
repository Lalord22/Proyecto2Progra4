class Categorias {
    constructor() {
        this.state = {
            entities: [], // Initialize entities as an empty array
            mode: '', // Initialize mode
        };
        this.dom = this.render();
        this.modal = new bootstrap.Modal(this.dom.querySelector('#modal'));
        this.dom.querySelector("#create").addEventListener('click', () => this.makenew()); // Use arrow function to maintain the context
        this.dom.querySelector('#apply').addEventListener('click', () => this.add()); // Use arrow function to maintain the context
    }

    render() {
        const html = `
      <div id="categorias">
        <div id="list" class="container">
          <div class="card bg-light">
            <h4 class="card-title mt-3 text-center">Categorias</h4>
            <div class="card-body mx-auto w-75">
              <form id="form">
                <div class="input-group mb-3">
                  <span class="input-group-text">Name</span>
                  <input id="name" type="text" class="form-control">
                  <div class="btn-toolbar">
                    <div class="btn-group me-2">
                      <button type="button" class="btn btn-primary" id="create">Create</button>
                    </div>
                  </div>
                </div>
              </form>

              <div class="table-responsive" style="max-height: 300px; overflow: auto">
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Descripcion</th>
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
            <form id="form">
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
        const categoriasContainer = document.createElement('div');
        categoriasContainer.innerHTML = html;
        return categoriasContainer;
    }

    list() {
        const request = new Request(`${backend}/categorias`, {method: 'GET', headers: {}});
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
            } catch (error) {
                console.error('Error fetching categorias:', error);
            }
        })();
    }

    row(list, ca) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${ca.id}</td>
      <td>${ca.descripcion}</td>`;
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
const categoriasTable = new Categorias();
document.body.appendChild(categoriasTable.dom);
Table.list(); // Call list() to fetch and display the polizas



