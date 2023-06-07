const express = require("express");
const app = express();
const fsPromises = require("fs/promises");
const { join } = require("path");

// Endpoint de Home
app.get("/", (req, res) => {
    res.send("Endpoint de home mi API esta funcionando CAMBIOANDO nodemon");
});

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

/**
 * En el lado de backend
 * Path params -> modifican la ruta agregando :pathParam
 * Query params -> no modifican la ruta
 */
// List koders
app.get("/koders", async (req, res) => {
    const { module } = req.query;
    console.log("req.query", req.query)
    const db = await fsPromises.readFile("./koders.json", "utf8"); // leemos base de datos
    const parsedDB = JSON.parse(db); // parseamos json
    const filteredKoders = parsedDB.koders.filter(koder => module === koder.module)
    // Esta vacio, no filtro
    if(filteredKoders.length === 0) {
        res.json(parsedDB.koders)
    } else {
        res.json(filteredKoders); // respondemos con header de Content-Type -> application/json
    }
});

// Get Koder by name
/**
 * Query params ->>>> ?modulo=Backend
 * Path params(identificador) ->>>> :name
 * 
 * ?postId=2
 */
app.get("/koders/:name", async (req, res) => {
    // Path param
    const { name } = req.params;
    const db = await fsPromises.readFile("./koders.json", "utf8");
    const parsedDb = JSON.parse(db);
    const filteredKoder = parsedDb.koders.filter(
        (koder) => koder.name.toLowerCase() === name.toLowerCase()
    )[0];
    res.json(filteredKoder);
});

app.listen(8080, () => {
    console.log("Nuestro servidor esta prendido");
});


/**
 * Ejercicio
 * 2 endpoints -
 * 1.er Donde me filtren por age los mentores
 * 2.do Donde obtengamos un mentor en especifico con su nombre
 */