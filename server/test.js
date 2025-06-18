/* eslint-disable no-undef */
// server/test.js
const { Pool } = require("pg");
require("dotenv").config({ path: __dirname + '/../.env' });
console.log("Probando conexión a PostgreSQL...");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT, 10),
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Error de conexión:", err.message);
  } else {
    console.log("✅ Conexión exitosa! Hora actual de la DB:", res.rows[0].now);
  }
  pool.end();
});
