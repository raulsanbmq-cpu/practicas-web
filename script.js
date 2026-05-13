// boton modo oscuro
var toggle = document.getElementById('modo');
var body = document.querySelector('body');

if (localStorage.getItem('tema') === 'oscuro') {
    body.classList.add('active');
}

toggle.onclick = function() {
    body.classList.toggle('active');

    if (body.classList.contains('active')) {
        localStorage.setItem('tema', 'oscuro');
    } else {
        localStorage.setItem('tema', 'claro');
    }
}

// Insertar contenido desde javascript
const estudios = [
    {
        titulo: "HTML",
        descripcion: "Meter la estructura básica de una página web."
    },
    {
        titulo: "CSS",
        descripcion: "Aplicando estilos al portafolio."
    },
    {
        titulo: "JavaScript",
        descripcion: "Añadiendo elementos mediante código."
    }
];