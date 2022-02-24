require("dotenv-safe").config();

process.env.SECRET

var express = require("express");
var morgan = require("morgan");
var cors = require("cors");
const { database, Ongs } = require("./models");
var app = express();

app.use(express.json());
app.use(cors());

app.use(morgan("combined"));

var usuarios = require("./routes/usuarios");
var tipoUsuario = require("./routes/tipoUsuario");
var ongs = require("./routes/ongs");
var relato = require("./routes/relato");
var endereco = require("./routes/endereco");

app.use("/usuarios", usuarios);
app.use("/usuario_tipos", tipoUsuario);
app.use("/ongs", ongs);
app.use("/relatos", relato);
app.use("/endereco", endereco);

app.get("/", function (req, res) {
  res.send("MORADOR DE RUA - API");
});

database.sync().then(() => {
  app.listen(process.env.PORT, function () {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
  });
});
