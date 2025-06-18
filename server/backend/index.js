/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 5000;

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASS),
  port: parseInt(process.env.DB_PORT, 10),
});

app.use(cors());
app.use(express.json());

// Ejemplo de endpoint: Obtener usuarios
app.get("/api/usuarios", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
