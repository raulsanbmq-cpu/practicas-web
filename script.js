// boton modo oscuro
var toggle = document.getElementById('modo');
var body = document.querySelector('body');

if (localStorage.getItem('tema') === 'oscuro') {
    body.classList.add('active');
}

toggle.onclick = function () {
    body.classList.toggle('active');

    if (body.classList.contains('active')) {
        localStorage.setItem('tema', 'oscuro');
    } else {
        localStorage.setItem('tema', 'claro');
    }
}

// Insertar contenido desde javascript
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
async function buscarUsuario() {

 const username = document.getElementById("username").value.trim();
 const card = document.getElementById("card");
 const error = document.getElementById("error");
 const listaRepos = document.getElementById("listaRepos");

  card.style.display = "none";
  error.style.display = "none";
  listaRepos.innerHTML = "";

    if (username === "") {
      error.textContent = "Debes escribir un usuario";
      error.style.display = "block";
      return;
    }

    try {
     const response = await fetch("https://api.github.com/users/" + username);

     if (!response.ok) {
            throw new Error("Usuario no encontrado");
        }

     const data = await response.json();

     document.getElementById("avatar").src = data.avatar_url;
     document.getElementById("name").textContent = data.name || data.login;
     document.getElementById("bio").textContent = data.bio || "Sin bio disponible";
     document.getElementById("repos").textContent = data.public_repos;

        // Parte para buscar repositorios
      const responseRepos = await fetch("https://api.github.com/users/" + username + "/repos");
      const repos = await responseRepos.json();

      repos.forEach(repo => {
         const li = document.createElement("li");

         const enlace = document.createElement("a");
         enlace.href = repo.html_url;
         enlace.textContent = repo.name;
         enlace.target = "_blank";

         li.appendChild(enlace);
         listaRepos.appendChild(li);
        });

     card.style.display = "block";

    } catch (err) {
     error.textContent = "Error: " + err.message;
     error.style.display = "block";
    }
}