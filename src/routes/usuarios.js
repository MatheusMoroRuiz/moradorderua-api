var express = require("express");
const auth = require("../auth");
const { Usuario } = require("../models");
var router = express.Router();

router.get("/", auth, async function (req, res) {
  res.send(await Usuario.findAll());
});

router.post("/", async function (req, res) {
  try {
    var usuario = await Usuario.create(req.body);
    res.send(usuario);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", async function (req, res) {
  var usuario = await Usuario.findByPk(req.params.id);
  try {
    if (usuario == null) throw new Error("Usuário não existe");

    res.send(usuario);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.put("/:id", async function (req, res) {
  var usuario = await Usuario.findByPk(req.params.id);

  try {
    if (usuario == null) throw new Error("Usuário não existe");


    await usuario.update(req.body);

    await usuario.reload();

    res.send(usuario);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.delete("/:id", async function (req, res) {
  var usuario = await Usuario.findByPk(req.params.id);
  try {
    if (usuario == null) throw new Error("Usuário não existe");

    await usuario.destroy();
    
    res.send(true);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

module.exports = router;
