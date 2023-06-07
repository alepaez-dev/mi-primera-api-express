const express = require("express");
const app = express();
const fsPromises = require("fs/promises");


// Middleware
app.use(express.json()) // Parsear todo lo que el cliente me manda a JSON

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
 * - En el lado de backend -
 * Path params -> modifican la ruta agregando :pathParam
 * Query params -> no modifican la ruta
 * 
 * - En el lado del cliente(google chrome, insomnia, postman);
 * Path params -> /recurso/pathParam/recurso/pathParam
 * Query Params -> /recurso?pathParam=valor 
 *    ? -> vamos a poner query params
 *    & -> concatenamos query params
 */
// List koders
app.get("/koders", async (req, res) => {
    const { module } = req.query;
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
app.get("/koders/:id", async (req, res) => {
    // Path param
    const { id } = req.params;
    console.log("tipo de dato de id", typeof id);
    const db = await fsPromises.readFile("./koders.json", "utf8");
    const parsedDb = JSON.parse(db);
    /**
     * 1 - Parsear a int
     * 2 - No utilizar comparacion estricta(===) para que no compare los tipos de datos
     */
    const filteredKoder = parsedDb.koders.filter(
        (koder) => koder.id === parseInt(id)
    )[0];
    res.json(filteredKoder);
});

// List mentos
app.get("/mentors", async (req, res) => {
    const { age } = req.query; 
    const db = await fsPromises.readFile("./koders.json", "utf8");
    const parsedDb = JSON.parse(db);
    // Ya tenemos a todos los mentors
    if(!age) {
        res.json(parsedDb.mentors)
        return;
    }
    // Continuamos
    const filteredMentors = parsedDb.mentors.filter(mentor => mentor.age === age);
    // Si encontro mentors con el query param de age
    if(filteredMentors.length > 0) {
        res.json(filteredMentors);
    // Que filtro, pero no encontro ningun mentor
    } else {
        res.json({ message: "El mentor no fue encontrado "});
    }
})

// Crear un koder -> /koders
app.post("/koders", async (req, res) => {
    // Acceso a la base de datos
    const db = await fsPromises.readFile("./koders.json", "utf8");
    const parsedDb = JSON.parse(db);
    // Crear nuestro objeto nuevo
    const koder = {
        id: parsedDb.koders.length + 1,
        ...req.body
    }
    // Agregarlo a nuestra ya creada bd
    parsedDb.koders.push(koder);
    // @ts-ignore
    // Agregarlo a la base de datos
    await fsPromises.writeFile("./koders.json", JSON.stringify(parsedDb, "\n", 4));

    // Response al cliente con nuestro objeto creado,  por si lo llega a necesitar
    res.json(koder)
})



/**
 * Ejercicio
 * 1 endpoint
 * Quiero actualizar un koder
 * 
 * method (PUT, PATCH)
 * ruta /koders/:id
 * metodos recomendados
 * -> findIndex, find
 */

app.patch("/koders/:id", async (req, res) => {
  // Parametros
  const { id } = req.params;

  // Acceder a nuestra base de datos
  const db = await fsPromises.readFile("./koders.json", "utf8");
  const parsedDb = JSON.parse(db);

  // Encontrar indice de koder a actualizar
  const index = parsedDb.koders.findIndex(koder => koder.id === parseInt(id))
  console.log("Indice :", index);
  console.log(`Arreglo en el indice ${index}`, parsedDb.koders[index])

  // Crear nuestro objeto nuevo
  const updatedKoder = {
    ...parsedDb.koders[index], // ponme todo lo que ya tengas
    ...req.body // agregame lo nuevo
  }

  // Actualizamos con el indice en la base de datos
  parsedDb.koders[index] = updatedKoder

  // @ts-ignore
  // Escribimos ya actualiza en nuestra base de datos
  await fsPromises.writeFile("./koders.json", JSON.stringify(parsedDb, "\n", 4));

  // Response con el koder actualizado
  res.json(updatedKoder);
})
app.listen(8080, () => {
    console.log("Nuestro servidor esta prendido");
});

/**
 * Tarea: Eliminar un koder
 */
