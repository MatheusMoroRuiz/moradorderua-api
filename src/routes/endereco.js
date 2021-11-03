var express = require("express");
const auth = require("../auth");
const { Endereco } = require("../models");
var router = express.Router();

router.get("/", auth, async function (req, res) {
  res.send(await Endereco.findAll());
});

router.post("/", async function (req, res) {
  try {
    var endereco = await Endereco.create(req.body);
    res.send(endereco);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", async function (req, res) {
  var endereco = await Endereco.findByPk(req.params.id);
  try {
    if (endereco == null) throw new Error("Telefone não existe");

    res.send(endereco);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.put("/:id", async function (req, res) {
  var endereco = await Endereco.findByPk(req.params.id);

  try {
    if (endereco == null) throw new Error("Endereco não existe");


    await endereco.update(req.body);

    await endereco.reload();

    res.send(endereco);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.delete("/:id", async function (req, res) {
  var endereco = await Endereco.findByPk(req.params.id);
  try {
    if (endereco == null) throw new Error("Endereco não existe");

    await endereco.destroy();
    
    res.send(true);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

module.exports = router;
