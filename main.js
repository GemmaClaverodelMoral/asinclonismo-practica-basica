
const usersDatabase = [
    {
    username: "andres",
    password: "123",
    },
    {
    username: "caro",
    password: "456",
    },
    {
    username: "mariana",
    password: "789",
    },
];

const usersTimeline = [
    {
    username: "Estefany",
    timeline: "Me encanta Javascript!",
    },
    {
    username: "Oscar",
    timeline: "Bebeloper es lo mejor!",
    },
    {
    username: "Mariana",
    timeline: "A mí me gusta más el café que el té",
    },
    {
    username: "Andres",
    timeline: "Yo hoy no quiero trabajar",
    },
];

const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const timeline = document.getElementById('timeline');

const postForm = document.getElementById('post-form');
const postTitle = document.getElementById("title");
const postContent = document.getElementById("content");

const message = document.getElementById('message');
const message2 = document.getElementById('message2');
const message3 = document.getElementById('message3');

const rickImage = document.getElementById('rick-img');
const rickName = document.getElementById("rick-name");
const rickLocationContainer = document.getElementById("rick-location-container");
const rickEpisodeContainer = document.getElementById("rick-episode-container");
const rickLocationName = document.getElementById("rick-location-name");
const rickEpisodeName = document.getElementById("rick-episode-name");

const pokeimage = document.getElementById('poke-img');
const pokeName = document.getElementById("poke-name");

const starWarsImage = document.getElementById('star-wars-img');
const starWarsName = document.getElementById('star-wars-name');

const defaultImage = "https://previews.123rf.com/images/urfandadashov/urfandadashov1809/urfandadashov180901275/109135379-foto-no-disponible-icono-del-vector-aislado-en-la-ilustraci%C3%B3n-transparente-transparente-concepto.jpg";
const defaultUrl = 'https://jsonplaceholder.typicode.com/posts'

const postsList = document.getElementById("posts-list");

// Función para verificar si una imagen está disponible
function setImageWithFallback(imgElement, imageUrl) {// Cuando la carga da 404: asignamos imagen por defecto
    console.log("Intentando cargar la imagen imageUrl:", imageUrl);

    // Verificar existencia de la imagen usando fetch
    fetch(imageUrl, { method: "HEAD" })
        .then((response) => {
            if (response.ok) {
                console.log("Imagen válida:", imageUrl);
                imgElement.src = imageUrl;
            } else {
                console.error("Imagen no encontrada (404):", imageUrl);
                imgElement.src = defaultImage;
            }
        })
        .catch((error) => {
            console.error("Error al verificar la imagen:", imageUrl, error);
            imgElement.src = defaultImage;
        });
  }

function credencialesOK(username,password) {// Validar credenciales
    const user = usersDatabase.find(
        (u) => u.username === username && u.password === password
        );
    return user;

}

function getTimeLine(username) { // get user timeline
    let userTimeline = usersTimeline.find(
        (t) => t.username.toLowerCase() === username
    );
    return userTimeline;
}

function displayTimeline(username) {
    
    if (username) {
        
        timeline.style.display = 'block';
        timeline.innerText = `${username.timeline}`;
    } else {
        timeline.style.display = 'block';
        timeline.innerText = "No hay timeline disponible para este usuario.";
    }
}

function cleantimeLine(){// Ocultar timeline-info de usuario al cambiar cualquier input

    const hideTimelineOnInputChange = () => {
        timeline.style.display = 'none';
        message.innerText = '';
    };

    usernameInput.addEventListener('input', hideTimelineOnInputChange);
    passwordInput.addEventListener('input', hideTimelineOnInputChange);
}
cleantimeLine(); // Limpiar timeline

function fetchStarWarsData() { // Creación de promesa con fetch .then .catch
    fetch("https://akabab.github.io/starwars-api/api/all.json")
    .then((response) => response.json())
    .then((data) => {
        const randomId = Math.floor(Math.random() * data.length);
        console.log(data, randomId);
        if (data[randomId]) {
            const imageUrl = data[randomId]?.image || defaultImage
            setImageWithFallback(starWarsImage, imageUrl); 
            starWarsName.textContent = data[randomId]?.name || "Nombre no disponible";
        } else {
            console.error("No se encontró el personaje.");
        }
    })
    .catch((error) => {
        console.error("Error al obtener los datos:", error);
        starWarsImage.src = defaultImage; // Mostrar imagen predeterminada si hay fallo general
        starWarsName.textContent = "No se pudo cargar la información.";
    });
}

async function fetchPokeData() { // Creación de promesa con async , fetch, try y catch : Mas comoda
    try {
       // Generar un ID aleatorio entre 1 y 1010
       const randomId = Math.floor(Math.random() * 1010) + 1;

       // Realizar la solicitud a la API con el ID aleatorio
       const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);

       const data = await response.json();
       // Actualizar nombre y la imagen con el sprite del Pokémon
       pokeimage.src = data.sprites.front_default;
       pokeName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);


    } catch (error) {
        console.error("Error:", error);
    }
}

const urlsRick = [
    "https://rickandmortyapi.com/api/character", 
    "https://rickandmortyapi.com/api/location", 
    "https://rickandmortyapi.com/api/episode"
  ];
  
async function fetchRickData() { // Creación de promesa con async , fetch, try y catch : Mas comoda
    try {
      for await (const url of urlsRick) {
       console.log(`Fetching data from: ${url}`);
       const response = await fetch(url);
       
       if (!response.ok) {
        console.log(`Error fetching ${url}: ${response.status}`);
       }
       const data = await response.json();
       console.log("data.results.length:", data.results.length);
       const randomId = Math.floor(Math.random() * data.results.length);
       console.log("data:",data,"randomId:",randomId);
       if (url === urlsRick[0]) {
            console.log(`url: ${url}`);
            console.log(`urlRick[0]:${urlsRick[0]}`);
            rickImage.src = data.results[randomId].image;
            rickName.textContent = data.results[randomId].name;
       }
       if (url === urlsRick[1]) {
            rickLocationName.textContent = `Locación: ${data.results[randomId].name}`;
       }
       if (url === urlsRick[2]) {
            rickEpisodeName.textContent = `Episodio: ${data.results[randomId].name}`;
       }
       rickLocationContainer.classList.remove("hidden");
       rickEpisodeContainer.classList.remove("hidden");
      }
    } catch (error) {
       console.log(error);
    }
}

//Escucha del click de los botones de login y cambios de personages 
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = usernameInput.value.toLowerCase();
    const password = passwordInput.value;
    //inicializar promesa para simulacion de 2s de espera
    const promesa = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (credencialesOK(username, password)) { 
                resolve("¡Inicio de sesión exitoso!");
            }
            else {
                reject("Ingrese Usuario o contraseña.");
            }
        }, 2000);
    });

    if (credencialesOK(username, password)) { 
        let userTimeline = getTimeLine(username);
        displayTimeline(userTimeline)
        promesa
            .then((successMessage) => {
                message2.style.color = 'green';
                message2.innerText = successMessage;
            })
    } else {
        timeline.style.display = 'none';
        promesa
            .catch((errorMessage) => {
                message2.style.color = 'green';
                message2.innerText = errorMessage;
            });
    }
});

function sendHTTPSRequest(method, url, data) {
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': `application/json; charset=utf-8`
        },
        body: JSON.stringify(data)
    })
    .then((response) => {return response.json()
        })
    .catch((error) => {return error.json()
    });
}

// Ejemplos de uso
async function getPosts() {
    const response = await 
    sendHTTPSRequest("GET", defaultUrl);
    for (const post of response) {
        const postContainer = document.createElement('article');
        postContainer.classList.add('post-element');
        postContainer.id = post.id;
        postContainer.innerHTML = 
        `
            <h3># ${post.id}: ${post.title}</h3>
            <p>${post.body}</p>
            <button id="btn-delete">DELETE</button>
        `;
        postsList.append(postContainer);
    }
}

async function setPost(titulo, contenido) {
    const userId = Math.random()
    const post = {
        title: titulo,
        body: contenido,
        userId: userId,
    }
    const response = await sendHTTPSRequest("POST", defaultUrl, post);
    console.log(response);
}

postForm.addEventListener("submit", (event) => {
    event.preventDefault(); 
    console.log(postTitle, postContent)
    setPost(postTitle.value, postContent.value)
});

postsList.addEventListener('click', (event) => {
    console.log(event);
    if (event.target.tagName === 'BUTTON') {
        const postId = event.target.closest("article").id;
        console.log("Post ID:", postId);
        sendHTTPSRequest("DELETE", `${defaultUrl}/${postId}`);
    }
});