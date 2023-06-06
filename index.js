const express = require("express");
const app = express();

// Endpoint de Home
app.get("/", (req, res) => {
  res.send("Endpoint de home mi API esta funcionando CAMBIOANDO nodemon");
})

// Endpoints


app.listen(8080, () => {
  console.log("Nuestro servidor esta prendido");
})