var toggle = document.getElementById('modo');
var body = document.querySelector('body');

/* Al cargar la página, comprueba si estaba guardado el modo oscuro */
if (localStorage.getItem('tema') === 'oscuro') {
    body.classList.add('active');
}

/* Al hacer clic, cambia el tema y lo guarda */
toggle.onclick = function() {
    body.classList.toggle('active');

    if (body.classList.contains('active')) {
        localStorage.setItem('tema', 'oscuro');
    } else {
        localStorage.setItem('tema', 'claro');
    }
}