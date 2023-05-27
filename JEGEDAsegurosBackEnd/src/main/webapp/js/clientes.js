class Clientes {
    constructor() {
        this.state = {
            entities: [], // Initialize entities as an empty array
            mode: '', // Initialize mode
        };
        this.dom = this.render();
        this.modal = new bootstrap.Modal(this.dom.querySelector('#modal'));
        this.dom.querySelector("#updateInfo").addEventListener('click', () => this.makenew()); // Use arrow function to maintain the context
        this.dom.querySelector("#search").addEventListener('click', () => this.search()); // Use arrow function to maintain the context
        this.dom.querySelector('#apply').addEventListener('click', () => this.add()); // Use arrow function to maintain the context
    }

    render() {
        const html = `
      
    `;
        
    }
    
   updateInfo() {
  // Fetch the cliente information from the backend
  fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/clientes/cliente')
  .then(response => response.json())
  .then(cliente => {
    // Create the HTML content for the update form
    const html = `
      <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="updateModalLabel">Update Info</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- Add your form elements here to allow the user to update their information -->
              <form>
                <div class="mb-3">
                  <label for="nameInput" class="form-label">Name</label>
                  <input type="text" class="form-control" id="nameInput" value="${cliente.nombre}" required>
                </div>
                <div class="mb-3">
                  <label for="emailInput" class="form-label">Email</label>
                  <input type="email" class="form-control" id="emailInput" value="${cliente.correo}" required>
                </div>
                <!-- Add more fields as needed -->
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" id="updateBtn">Update</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Append the HTML content to the DOM
    const updateModalContainer = document.createElement('div');
    updateModalContainer.innerHTML = html;
    document.body.appendChild(updateModalContainer);

    // Show the update modal
    const updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    updateModal.show();

    // Handle the update button click event
    const updateBtn = document.getElementById('updateBtn');
    updateBtn.addEventListener('click', () => {
      // Retrieve the updated values from the form
      const updatedName = document.getElementById('nameInput').value;
      const updatedEmail = document.getElementById('emailInput').value;

      // Perform the necessary update actions with the updated information
      // ...

      // Close the update modal
      updateModal.hide();

      // Perform any additional actions or update the UI as needed
      // ...
    });
  })
  .catch(error => {
    console.error('Error fetching cliente:', error);
  });
}


}

