class Coberturas {
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
                    <th scope="col">Categoria</th>
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
              <div class="mb-3">
                <label for="categorySelect" class="form-label">Categoría</label>
                <select id="categorySelect" class="form-select">
                  <!-- Categories options will be populated dynamically -->
                </select>
              </div>
              <div class="mb-3">
                <label for="descriptionInput" class="form-label">Descripción</label>
                <input type="text" id="descriptionInput" class="form-control">
              </div>
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
  const applyButton = coberturasContainer.querySelector('#apply');
  applyButton.addEventListener('click', () => this.add());
  return coberturasContainer;
}

    
    getCategoriaById(coverageId) {
  const request = new Request(`${backend}/categorias/${coverageId}`, { method: 'GET', headers: {} });
  return fetch(request)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch categoria by ID');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching categoria by ID:', error);
      throw error;
    });
}



   list() {
  const request = new Request(`${backend}/coberturas`, { method: 'GET', headers: {} });
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
      this.state.entities.forEach(async e => {
        const cobertura = e;
        const categoria = await this.getCategoriaById(cobertura.id);
        cobertura.categoria = categoria;
        this.row(listing, cobertura);
      });
    } catch (error) {
      console.error('Error fetching coberturas:', error);
    }
  })();
}


    row(list, co) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${co.id}</td>
      <td>${co.descripcion}</td>
      <td>${co.costoMinimo}</td>
      <td>${co.costoPorcentual}</td>
      <td>${co.categoria.descripcion}</td>`;
        list.append(tr);
    }

makenew() {
  const categorySelect = this.dom.querySelector('#categorySelect');
  categorySelect.innerHTML = ''; // Clear existing options

  // Fetch categorias from the endpoint
  fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/categorias')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch categorias');
      }
      return response.json();
    })
    .then((categorias) => {
      // Populate category options
      categorias.forEach((categoria) => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.descripcion;
        categorySelect.appendChild(option);
      });

      // Display the modal
      this.modal.show();
    })
    .catch((error) => {
      console.error('Error fetching categorias:', error);
    });
}




    add() {
  const categorySelect = this.dom.querySelector('#categorySelect');
  const descriptionInput = this.dom.querySelector('#descriptionInput');
  const category = categorySelect.value;
  const description = descriptionInput.value;

  const newCobertura = {
    categoria: category,
    descripcion: description,
  };

  // TODO: Send the newCobertura object to the backend or perform desired actions

  this.reset();
  this.modal.hide();
}


}

// Usage example:
const coberturasTable = new Coberturas();
document.body.appendChild(coberturasTable.dom);
coberturasTable.list();
