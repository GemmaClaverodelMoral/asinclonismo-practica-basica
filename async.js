//Promise
//3 estados
// pending: pendinete
// fullfilled: resuleta
// rejected: no resuelta

//2 callBacks: resultados
//resolve: resuelta
//reject: no resuelta

// 2 metodos de las promesas
// then() : cuando se resuelve
// catch(): cuando no se resuelve

// Crear una promesa

const promesa = new Promise((resolve, reject) => {
    setTimeout(() => {
        // Simulando una operación que puede llegar a fallar
        const randomNumber = Math.random();

        if (credencialesOK(username,password)) {
            resolve("¡Inicio de sesión exitoso!");
        } else {
            reject("Esperando Usuario o contraseña.");
        }
    }, 2000);
});

promesa
    .then((successMessage) => {
        message2.style.color = 'green';
        message2.innerText = successMessage;
    })
    .catch((errorMessage) => {
        message2.style.color = 'green';
        message2.innerText = errorMessage;
    });

