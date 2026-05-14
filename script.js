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
// Obtener elementos del HTML
const inputEstudio = document.getElementById("inputEstudio");
const btnAgregar = document.getElementById("btnAgregar");
const listaEstudios = document.getElementById("listaEstudios");

btnAgregar.addEventListener("click", agregarEstudio);

function agregarEstudio() {


    const texto = inputEstudio.value.trim();


    if (texto === "") {
        alert("Escribe un estudio");
        return;
    }

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = texto;
    span.classList.add("estudio");

    span.addEventListener("click", () => {
    span.classList.toggle("completada");
});

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";

    botonEliminar.addEventListener("click", function () {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(botonEliminar);

    listaEstudios.appendChild(li);

    inputEstudio.value = "";
}

//Buscador de perfil de Github
// API de GitHub

const inputGitHub = document.getElementById("usuarioGitHub");
const btnGitHub = document.getElementById("btnGitHub");
const resultadoGitHub = document.getElementById("resultadoGitHub");
const listaRepos = document.getElementById("listaRepos");

btnGitHub.addEventListener("click", buscarGitHub);

async function buscarGitHub() {
    const usuario = inputGitHub.value.trim();

    if (usuario === "") {
        alert("Escribe un usuario de GitHub");
        return;
    }

    resultadoGitHub.innerHTML = "";
    listaRepos.innerHTML = "";

    try {
        const respuestaUsuario = await fetch("https://api.github.com/users/" + usuario);

        if (!respuestaUsuario.ok) {
            throw new Error("Usuario no encontrado");
        }

        const datosUsuario = await respuestaUsuario.json();

        resultadoGitHub.innerHTML = `
            <img src="${datosUsuario.avatar_url}" alt="Avatar de GitHub" width="100">
            <h3>${datosUsuario.login}</h3>
            <p>${datosUsuario.bio || "Sin biografía"}</p>
            <p>Repositorios públicos: ${datosUsuario.public_repos}</p>
        `;

        const respuestaRepos = await fetch("https://api.github.com/users/" + usuario + "/repos");
        const repositorios = await respuestaRepos.json();

        for (let repo of repositorios) {
            const li = document.createElement("li");

            const enlace = document.createElement("a");
            enlace.href = repo.html_url;
            enlace.textContent = repo.name;
            enlace.target = "_blank";

            li.appendChild(enlace);
            listaRepos.appendChild(li);
        }

    } catch (error) {
        resultadoGitHub.innerHTML = `<p>${error.message}</p>`;
    }
}