var express = require("express");
var morgan = require("morgan");
const { database } = require("./models");
var app = express();

app.use(express.json());

app.use(morgan("combined"));

var usuarios = require("./routes/usuarios");
var tipoUsuario = require("./routes/tipoUsuario");
var telefone = require("./routes/telefone");
var ong = require("./routes/ongs");

app.use("/usuario", usuarios);
app.use("/tipousuario", tipoUsuario);
app.use("/telefone", telefone);
app.use("/ong", ong);

app.get("/", function (req, res) {
  res.send("MORADOR DE RUA - API");
});

database.sync().then(() => {
  app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000");
  });
});
