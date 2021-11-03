var express = require("express");
const auth = require("../auth");
const { Telefone } = require("../models");
var router = express.Router();

router.get("/", auth, async function (req, res) {
  res.send(await Telefone.findAll());
});

router.post("/", async function (req, res) {
  try {
    var telefone = await Telefone.create(req.body);
    res.send(telefone);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", async function (req, res) {
  var telefone = await Telefone.findByPk(req.params.id);
  try {
    if (telefone == null) throw new Error("Telefone não existe");

    res.send(telefone);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.put("/:id", async function (req, res) {
  var telefone = await Telefone.findByPk(req.params.id);

  try {
    if (telefone == null) throw new Error("Telefone não existe");


    await telefone.update(req.body);

    await telefone.reload();

    res.send(telefone);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.delete("/:id", async function (req, res) {
  var telefone = await Telefone.findByPk(req.params.id);
  try {
    if (telefone == null) throw new Error("Telefone não existe");

    await telefone.destroy();
    
    res.send(true);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

module.exports = router;
