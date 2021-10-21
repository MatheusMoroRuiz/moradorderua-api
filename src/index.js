var express = require("express");
var morgan = require("morgan");
const { database } = require("./models");
var app = express();

app.use(express.json());

app.use(morgan("combined"));

var usuarios = require("./routes/usuarios");
var produto = require("./routes/produtos");
var categoria = require("./routes/categorias");

app.use("/usuarios", usuarios);
app.use("/produtos", produto);
app.use("/categorias", categoria);

app.get("/", function (req, res) {
  res.send("VENDAS API");
});

database.sync().then(() => {
  app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000");
  });
});
