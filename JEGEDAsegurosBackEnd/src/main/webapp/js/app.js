class App {
    dom;
    modal; // login modal
    registrationModal; // registration modal

    state; // state variables: if any

    polizas; //

    constructor() {
        this.state = {};
        this.dom = this.render();
        this.modal = new bootstrap.Modal(this.dom.querySelector('#modal'));
        this.registrationModal = new bootstrap.Modal(this.dom.querySelector('#registerModal'));
        this.dom.querySelector('#apply').addEventListener('click', e => this.login());
        this.dom.querySelector('#registerLink').addEventListener('click', e => this.openRegistrationModal());
        this.renderBodyFiller(); //Cuando la pagina se abre por primera vez, esto imprime el body del website
        this.renderMenuItems(); // Esto carga las opciones en el banner
        this.polizas = new Polizas();
        this.dom.querySelector('#registrationForm').addEventListener('submit', e => {
            e.preventDefault(); // Prevent the default form submission behavior
            this.register(); // Call the register method when the form is submitted
        });
    }

    render = () => {
        const html = `
      ${this.renderMenu()}
      ${this.renderBody()}
      ${this.renderFooter()}
      ${this.renderModal()}
      ${this.renderRegistrationModal()}
    `; //renderMenu esta relacionado al banner

        var rootContent = document.createElement('div');
        rootContent.id = 'app';
        rootContent.innerHTML = html;
        return rootContent;
    }

    renderMenu = () => {
        return `
      <nav id="menu" class="navbar navbar-expand-lg p-0 navbar-dark bg-black">
        <div class="container-fluid">
          <a class="navbar-brand  font-italic font-weight-light  text-info" href="#">
            <img src="images/logo3.png" class="logo rounded-circle" alt="logo">
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuCollapse">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div id="menuCollapse" class="collapse navbar-collapse">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0" id='menuItems'>
            </ul>
          </div>
        </div>
      </nav>
    `;
    }

    renderBody = () => {
        return `
      <div id="body">   
      </div>
    `;
    }

    renderFooter = () => {
        return `
      <footer id="footer" class="bg-black text-white mt-4 w-100 fixed-bottom">
        <div class="container-fluid py-2">
          <div class="row">
            <div class="col-md-2"><h5>Total Soft Inc.</h5></div>
            <div class="col-md-7"><h4>
              <i class="fab fa-twitter"></i>
              <i class="fab fa-facebook"></i>
              <i class="fab fa-instagram"></i></h4>
            </div>
            <div class="col-md-3 text-right small align-self-end">©2023 Tsf, Inc.</div>
          </div>
        </div>
      </footer>
    `;
    }

    renderModal = () => {
        return `
      <div id="modal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <img class="img-circle" id="img_logo" src="images/user.png" style="max-width: 50px; max-height: 50px" alt="logo">
              <span style='margin-left:4em;font-weight: bold;'>Login</span>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="form">
              <div class="modal-body">
                <div class="input-group mb-3">
                  <span class="input-group-text">Id</span>
                  <input type="text" class="form-control" id="identificacion" name="identificacion">
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text">Clave</span>
                  <input type="password" class="form-control" id="clave" name="clave">
                </div>
              </div>
              <div class="modal-footer">
                <button id="apply" type="button" class="btn btn-primary" id="apply">Login</button>
              </div>
              <div class="input-group">
                <span style="font-style: italic; margin-left: 2em;">No tiene cuenta? ... </span>
                <a id="registerLink" class="btn btn-info btn-block" style="margin-bottom: 15px; background-color: white; color:red; border:1px solid red" href="#">Registrese aquí</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    }

    renderRegistrationModal = () => {
        return `
      <div id="registerModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Registration</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="registrationForm">
              <div class="modal-body">
                <div class="input-group mb-3">
                  <span class="input-group-text">Id</span>
                  <input type="text" class="form-control" id="registrationId" name="cedula">
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text">Name</span>
                  <input type="text" class="form-control" id="registrationName" name="nombre">
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text">Email</span>
                  <input type="email" class="form-control" id="registrationEmail" name="correo">
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text">Phone Number</span>
                  <input type="tel" class="form-control" id="registrationTelefono" name="telefono">
                </div>
                 <div class="input-group mb-3">
                  <span class="input-group-text">Credit Card</span>
                  <input type="text" class="form-control" id="registrationDatosTarjeta" name="datosTarjeta">
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text">Password</span>
                  <input type="password" class="form-control" id="registrationPassword" name="clave">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    }

    renderBodyFiller = () => {
        var html = `
      <div id='bodyFiller' style='margin-left: 10%; margin-top:40px; width: 80%; text-align: center; font-size: 1.5em'>
        <div class="left-half">
          <div class="mission">
            <h2>Misión</h2>
            <p>Ofrecer a nuestros clientes una amplia gama de seguros para sus vehículos en Costa Rica, brindando un servicio de calidad y personalizado, para garantizar su tranquilidad y protección ante cualquier eventualidad.</p>
            <h2>Visión</h2>
            <p>Ser reconocidos como la mejor empresa de venta de seguros para vehículos en Costa Rica, a través de la mejora continua en nuestros servicios, la innovación en nuestra oferta y el compromiso con nuestros clientes, para ser su mejor opción en protección y tranquilidad en la carretera.</p>
          </div>
        </div>
        <img src="images/local.jpeg" class="filler rounded-circle" alt="filler">
        <div style="height: 150px;"></div>
      </div>
    `;
        this.dom.querySelector('#app>#body').replaceChildren();
        this.dom.querySelector('#app>#body').innerHTML = html;
    }

    renderMenuItems = () => {
        var html = '';
        if (globalstate.user === null) {
            html += `
        <li class="nav-item">
          <a class="nav-link" id="loginLink" href="#" data-bs-toggle="modal"> <span><i class="fa fa-address-card"></i></span> Login </a>
        </li>
      `;
        } else {
            if (globalstate.user.tipo === 1) {
                html += `
          <li class="nav-item">
            <a class="nav-link" id="polizas" href="#"> <span><i class="fas fa-file-alt"></i></span> Polizas </a>
          </li>
        `;
            }
            if (globalstate.user.tipo === 2) {
                html += `
          
        `;
            }
            html += `
        <li class="nav-item">
          <a class="nav-link" id="logoutLink" href="#" data-bs-toggle="modal"> <span><i class="fas fa-power-off"></i></span> Logout (${globalstate.user.cedula}) </a>
        </li>
      `;
        }
        this.dom.querySelector('#app>#menu #menuItems').replaceChildren();
        this.dom.querySelector('#app>#menu #menuItems').innerHTML = html;
        this.dom.querySelector("#app>#menu #menuItems #polizas")?.addEventListener('click', e => this.polizasShow());
        this.dom.querySelector("#app>#menu #menuItems #loginLink")?.addEventListener('click', e => this.modal.show());
        this.dom.querySelector("#app>#menu #menuItems #logoutLink")?.addEventListener('click', e => this.logout());
        this.dom.querySelector("#registerLink")?.addEventListener('click', e => this.registrationModal.show());
        if (globalstate.user !== null) {
            switch (globalstate.user.rol) {
                case 'CLI':
                    this.polizasShow();
                    break;
            }
        }
    }

    polizasShow = () => {
        this.dom.querySelector('#app>#body').replaceChildren(this.polizas.dom);
        this.polizas.list();
    }

    login = async () => {
        const candidate = {
            cedula: this.dom.querySelector("#identificacion").value,
            clave: this.dom.querySelector("#clave").value,
        };

        try {
            const response = await fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(candidate),
            });

            if (response.ok) {
                const user = await response.json();
                globalstate.user = user;
                this.modal.hide();
                this.renderMenuItems();
            } else if (response.status === 401) {
                alert("Credenciales inválidas. Por favor, verifique su Id y Clave.");
            } else {
                alert("Ocurrió un error al iniciar sesión. Por favor, intente nuevamente más tarde.");
            }
        } catch (error) {
            console.log(error);
            alert("Ocurrió un error al iniciar sesión. Por favor, intente nuevamente más tarde.");
        }
    }

    reset = () => {
        const bodyElement = this.dom.querySelector('#app>#body');
        bodyElement.innerHTML = '';
    }

    logout = () => {
        globalstate.user = null;
        this.reset();
        this.renderMenuItems();
        this.renderBodyFiller();
    }

    openRegistrationModal = () => {
        this.modal.hide();
        this.registrationModal.show();
    }

    register = async () => {
        const registrationForm = this.dom.querySelector('#app>#registerModal #registrationForm');
        const formData = new FormData(registrationForm);

        const userData = {
            cedula: document.getElementById("registrationId").value,
            clave: document.getElementById("registrationPassword").value,
            nombre: document.getElementById("registrationName").value,
            correo: document.getElementById("registrationEmail").value,
            telefono: document.getElementById("registrationTelefono").value,
            datosTarjeta: document.getElementById("registrationDatosTarjeta").value
        };

        try {
            const usuarioResponse = await fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/usuarios/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const clienteResponse = await fetch('http://localhost:8080/JEGEDAsegurosBackEnd/api/clientes/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (usuarioResponse.ok && clienteResponse.ok) {
                // Registration successful for both Usuario and Cliente
                alert('Registration successful. You can now log in with your credentials.');
                this.registrationModal.hide();
                this.modal.show(); // Show the login modal after successful registration
            } else if (usuarioResponse.status === 409 || clienteResponse.status === 409) {
                // User already exists
                alert('A user with the same ID or email already exists. Please check your information.');
            } else {
                // Registration failed
                alert('An error occurred during registration. Please try again later.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration. Please try again later.');
        }
    }

    registrationModalShow = () => {
        this.registrationModal.show();
    }

    // Existing code...



}



