class Categorias {
  constructor() {
    this.state = {
      entities: [], // Initialize entities as an empty array
      mode: '', // Initialize mode
    };
    this.dom = this.render();
    this.modal = new bootstrap.Modal(this.dom.querySelector('#modal'));
    this.dom.querySelector("#create").addEventListener('click', () => this.makenew()); // Use arrow function to maintain the context
    this.dom.querySelector("#registerCobertura").addEventListener('click', () => this.registerCobertura())
  }

  render() {
    const html = `
      <div id="categorias">
        <div id="list" class="container">
          <div class="card bg-light">
            <h4 class="card-title mt-3 text-center">Categorias</h4>
            <div class="card-body mx-auto w-75">
            <form id="form">
                    <div class="btn-group me-2">
                      <button type="button" class="btn btn-primary" id="create">Create</button>
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
            <form id="modalForm">
              <div class="modal-body">
                <h1>Create a New Categoria</h1>
                <div class="form-group">
                  <label for="name">Name:</label>
                  <input type="text" class="form-control" id="name">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    <div id="modal" class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Register New Cobertura</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="coberturaForm">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" required>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" id="description" rows="3" required></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="registerCobertura">Register</button>
          </div>
        </div>
      </div>
    </div>
  `;
  const categoriasContainer = document.createElement('div');
  categoriasContainer.innerHTML = html;
  return categoriasContainer;
  }

  list() {
    const request = new Request(`${backend}/categorias`, { method: 'GET', headers: {} });
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
  this.modal.show();
}

registerCobertura() {
  const nameInput = this.dom.querySelector("#name");
  const descriptionInput = this.dom.querySelector("#description");

  // Get the values from the input fields
  const name = nameInput.value.trim();
  const description = descriptionInput.value.trim();

  // Validate the input
  if (!name || !description) {
    // Show an error message or handle validation as needed
    return;
  }

  // Create a new cobertura object
  const newCobertura = {
    name,
    description,
  };

  // TODO: Send the new cobertura object to the server to save it

  // Reset the input fields
  nameInput.value = "";
  descriptionInput.value = "";

  // Close the modal
  this.modal.hide();

  // TODO: Add the new cobertura to the table or update the table data
}


}



// Usage example:
const categoriasTable = new Categorias();
document.body.appendChild(categoriasTable.dom);
categoriasTable.list(); // Call list() to fetch and display the categorias
