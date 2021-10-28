var express = require("express");
var morgan = require("morgan");
var cors = require("cors");
const { database } = require("./models");
var app = express();

app.use(express.json());
app.use(cors());

app.use(morgan("combined"));

var usuarios = require("./routes/usuarios");
var tipoUsuario = require("./routes/tipoUsuario");
var telefone = require("./routes/telefone");
var ong = require("./routes/ongs");
var relato = require("./routes/relato");

app.use("/usuarios", usuarios);
app.use("/usuario_tipos", tipoUsuario);
app.use("/telefones", telefone);
app.use("/ongs", ong);
app.use("/relatos", relato);

app.get("/", function (req, res) {
  res.send("MORADOR DE RUA - API");
});

database.sync().then(() => {
  app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000");
  });
});
