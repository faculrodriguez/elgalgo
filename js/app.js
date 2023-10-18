/* LOGIN */
 function iniciarSesion() {
    let nombreUsuario;
    let esNombreUsuarioValido = false;

    while (!esNombreUsuarioValido) {
        nombreUsuario = prompt("Ingrese su nombre de Usuario");
        if (nombreUsuario !== "") {
            esNombreUsuarioValido = true;
        } else {
            alert("Ingrese un Usuario válido");
        }
    }

    alert(`Bienvenido ${nombreUsuario}`);
    document.querySelector("#nombreU").textContent= `Hola ${nombreUsuario}`


    const contraseñaCorrecta = "1234";
    let esContraseñaCorrecta = false;

    while (!esContraseñaCorrecta) {
        let contraseña = prompt("Ingrese su contraseña:");
        if (contraseña === contraseñaCorrecta) {
            esContraseñaCorrecta = true;
            alert(`${nombreUsuario} has iniciado sesión correctamente.`);
        } else {
            alert("Contraseña incorrecta. Inténtelo de nuevo.");
        }
    }
}

iniciarSesion();

/* CATALOGO */
const catalogo = document.querySelector(".catalogo")

function Producto(id, nombre, categoria, precio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.imagen = imagen;
}


let productos = [
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
]

let filtro = productos.filter(producto => producto.categoria === "Rodillos");

for (let producto of filtro) {
    let contenedor = document.createElement("div");
    contenedor.className = "col-xl-3 col-md-6 col-sm-12";
    contenedor.innerHTML = `
        <div class="card text-center">
            <img src= ${producto.imagen} class="card-img-top h-100" alt="">
                <div class="card-body">
                    <p class="card-title"> ${producto.nombre} </p>
                    <p class="card-text"> <strong> $ ${producto.precio} </strong> </p>
                    <a href="#" class="btn btn-danger"> Comprar </a>
                </div>
        </div>
    </div>
  `;

catalogo.appendChild(contenedor)
}

/* CARRITO */
const carritoCompras = document.querySelector(".carritoCompras")


const carrito = []

carrito.push(productos[2])
carrito.push(productos[5])
carrito.push(productos[7])
console.log(carrito)

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


let resultado = carrito.reduce((accum, producto) => 
{ return accum + producto.precio}, 0)
 
const totalElement = document.getElementById("total");
totalElement.textContent = "Total $" + resultado;