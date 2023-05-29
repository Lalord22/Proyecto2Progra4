class Categorias {
  constructor() {
    this.state = {
      entities: [], // Initialize entities as an empty array
      mode: '', // Initialize mode
    };
    this.dom = this.render();
    this.modal = new bootstrap.Modal(this.dom.querySelector('#modal'));
    this.dom.querySelector("#create").addEventListener('click', () => this.makenew()); // Use arrow function to maintain the context
    
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
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="submitCategoria">Submit</button>
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
    const request = new Request(`${backend}/categorias`, { method: 'GET', headers: {} });
    (async () => {
      try {
        const response = await fetch(request);
        if (!response.ok) {
          errorMessage(response.status);
          return;
        }
        const categorias = await response.json();
        this.state.entities = categorias; // Update entities in the state
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
            this.dom.querySelector("#submitCategoria").addEventListener('click', (event) => this.registerCategoria(event))

  }

registerCategoria(event) {
  event.preventDefault(); // Prevent form submission

  const nameInput = this.dom.querySelector("#name");

  // Get the value from the input field
  const name = nameInput.value.trim();

  // Validate the input
  if (!name) {
    // Show an error message or handle validation as needed
    return;
  }

  // Create a new categoria object
  const newCategoria = {
    name,
  };

  // Send the new categoria object to the server to save it
  const endpoint = 'http://localhost:8080/JEGEDAsegurosBackEnd/api/categorias/add';
  const request = new Request(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCategoria),
  });

  (async () => {
    try {
      const response = await fetch(request);
      if (!response.ok) {
        // Handle the error response
        return;
      }
      // Handle the success response

      // Reset the input field
      nameInput.value = "";

      // Close the modal
      this.modal.hide();

      // TODO: Update the table or fetch the updated categorias list
    } catch (error) {
      console.error('Error registering categoria:', error);
    }
  })();
}




  
  
}

// Usage example:
const categoriasTable = new Categorias();
document.body.appendChild(categoriasTable.dom);
categoriasTable.list(); // Call list() to fetch and display the categorias
