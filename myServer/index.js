const express = require("express");
const path = require("path");
const { calcularCuota } = require("./scripts/utils");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/transactions", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "initial.html"));
});

app.post("/transactions", (req, res) => {
    const nombre = req.body.nombre;
    const prestamo = parseFloat(req.body.prestamo);
    const meses = parseInt(req.body.meses);
    const interes = parseFloat(req.body.interes);

    const cuota = calcularCuota(prestamo, interes, meses);

    if (!cuota) {
        return res.send("Datos inválidos.");
    }

    const resultado = `${nombre} – $ ${cuota.toFixed(2)} -- $ ${prestamo} -- ${meses} meses -- interés ${interes * 100}%`;

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Resultado</title>
        </head>
        <body>

            <h2>Formulario de Préstamo</h2>

            <form method="POST" action="/transactions">

                <label>Nombre:</label><br>
                <input type="text" name="nombre" required><br><br>

                <label>Valor del Préstamo:</label><br>
                <input type="number" name="prestamo" required><br><br>

                <label>Número de meses:</label><br>
                <input type="number" name="meses" required><br><br>

                <label>Interés mensual (ej: 0.02 para 2%):</label><br>
                <input type="number" step="0.01" name="interes" required><br><br>

                <button type="submit">Calcular</button>

            </form>

            <h3>Resultado:</h3>
            <textarea rows="4" cols="70">${resultado}</textarea>

        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000/transactions");
});
