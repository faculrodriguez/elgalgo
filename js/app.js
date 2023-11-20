/* LOGIN */

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = inputNombre.value;
    const contrasena = inputPassword.value;

    usuarioIncorrecto.textContent = (nombre !== "" && contrasena === "1234")
        ? "Hola, " + nombre
        : "Nombre de usuario o contraseña incorrectos. Inténtelo de nuevo.";

    if (nombre !== "" && contrasena === "1234") {
        const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
        modal.hide();

        nombreU.textContent = "Hola, " + nombre;
        nombreU.style.display = "inline";
        btnInicioSesion.style.display = "none";
    }
});

/* CATALOGO */

function Producto(id, nombre, categoria, precio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.imagen = imagen;
}

function crearProductoCard(producto) {
    const contenedor = document.createElement("div");
    contenedor.className = "col-xl-3 col-md-6 col-sm-12";
    contenedor.innerHTML = `
        <div class="card text-center">
            <img src="${producto.imagen}" class="card-img-top h-100" alt="">
            <div class="card-body">
                <p class="card-title">${producto.nombre}</p>
                <p class="card-text"><strong>$${producto.precio}</strong></p>
                <a href="#" class="btn btn-danger btnComprar">Comprar</a>
            </div>
        </div>
    `;
    const botonComprar = contenedor.querySelector('.btnComprar');
    botonComprar.addEventListener('click', function () {
        carrito.push(producto);
        actualizarCarrito();
        /* mensaje exitoso */
        Toastify({
            text: "Producto añadido al carrito",
            gravity: "bottom",
            duration: 3000
        }).showToast();
    });
    return contenedor;
}

document.addEventListener("DOMContentLoaded", async function () {
    const traerProductos = './json/data.json'

    try {
        const response = await fetch(traerProductos);
        const productos = await response.json();

        const catalogo = document.querySelector('.contenedorProductos');

        function mostrarProductos(productos) {
            catalogo.innerHTML = "";
            productos.forEach(producto => {
                const contenedor = crearProductoCard(producto);
                catalogo.appendChild(contenedor);
            });
        }

        const breadcrumbItems = document.querySelectorAll('.breadcrumb-item');

        breadcrumbItems.forEach(item => {
            item.addEventListener('click', function () {
                const categoriaSeleccionada = this.id;
                const productosFiltrados = categoriaSeleccionada !== 'todos'
                    ? productos.filter(producto => producto.categoria.toLowerCase() === categoriaSeleccionada)
                    : productos;
                mostrarProductos(productosFiltrados);
            });
        });

        mostrarProductos(productos);
    } catch (error) {
        console.error("Error al cargar productos:");
    }
});


/* CARRITO */

const carritoCompras = document.querySelector(".carritoCompras")


const carrito = []

/* local storage */
const datosGuardados = localStorage.getItem("carrito");
if (datosGuardados) {
    carrito.push(...JSON.parse(datosGuardados));
}

function actualizarCarrito() {
    carritoCompras.innerHTML = ''; 

    for (let producto of carrito) {
        let cont = document.createElement("div")
        cont.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src= ${producto.imagen} class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title"> ${producto.nombre} </h5>
            <p class="card-text"> $${producto.precio} </p>
          </div>
        </div>
      </div>
    </div>
        
        `

        carritoCompras.appendChild(cont)
    }


    let resultado = carrito.reduce((accum, producto) => { return accum + producto.precio }, 0)

    const totalElement = document.getElementById("total");
    totalElement.textContent = "Total $" + resultado;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const botonVaciarCarrito = document.getElementById("vaciarCarrito");

botonVaciarCarrito.addEventListener("click", function () {
    localStorage.removeItem("carrito");

    carrito.length = 0;

    actualizarCarrito();

    /* Mensaje exitoso */
    Toastify({

        text: "Carrito vaciado correctamente",
        gravity: "top",
        duration: 3000

    }).showToast();


});

actualizarCarrito();