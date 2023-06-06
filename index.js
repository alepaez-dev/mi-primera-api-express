const { response } = require("express");
const express = require("express");
const app = express();
const fsPromises = require("fs/promises");

// Endpoint de Home
app.get("/", (req, res) => {
  res.send("Endpoint de home mi API esta funcionando CAMBIOANDO nodemon");
})

// Endpoints
/**
 * 1er endpoint
 * Enlistar koders.
 * ARQ REST
 * recurso/identificar 
 * method -> GET
 * ruta -> /koders
 * 
 */

app.get("/koders", async (req, res) => {
  const db = await fsPromises.readFile("./koders.json", "utf8");
  const parsedDB = JSON.parse(db);
  console.log("DB no parseada", db);
  console.log("DB si parseada", parsedDB);
  res.json(parsedDB);
})

app.listen(8080, () => {
  console.log("Nuestro servidor esta prendido");
})