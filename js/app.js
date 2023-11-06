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

document.addEventListener("DOMContentLoaded", function () {
    const productos = [
        new Producto (1, "Paredes y Techos", "Rodillos", 2100, "img/rodillo1.jpg"),
    new Producto (2, "Microfibra", "Rodillos", 2100, "img/rodillo2.jpg"),
    new Producto (3, "Epoxi", "Rodillos", 2300, "img/rodillo3.jpg"),
    new Producto (4, "Antigota", "Rodillos", 2500, "img/rodillo4.jpg"),
    new Producto (5, "Hogar", "Rodillos", 2400, "img/rodillo5.jpg"),
    new Producto (6, "Cuero Lanar", "Rodillos", 2200, "img/rodillo6.jpg"),
    new Producto (7, "Dorado", "Rodillos", 2600, "img/rodillo7.jpg"),
    new Producto (8, "EG Plus", "Rodillos", 2700, "img/rodillo8.jpg"),
    new Producto (1000, "Bandeja de Colgar", "Bandejas", 3600, "img/bandeja1.jpg"),
    new Producto (1001, "Bandeja de Colgar Economica", "Bandejas", 3200, "img/bandeja2.jpg"),
    new Producto (1002, "Bandeja Chata", "Bandejas", 4600, "img/bandeja3.png"),
    new Producto (1003, "Bandeja Chata Economica", "Bandejas", 4000, "img/bandeja4.png"),
    new Producto (1004, "Handy Paint", "Bandejas", 3000, "img/bandeja5.jpg"),
    ];

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