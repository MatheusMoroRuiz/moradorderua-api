var express = require("express");
const { Relato } = require("../models");
var router = express.Router();

router.get("/", async function (req, res) {
  res.send(await Relato.findAll());
});

router.post("/", async function (req, res) {
  try {
    var relato = await Relato.create(req.body);
    res.send(relato);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", async function (req, res) {
  var relato = await Relato.findByPk(req.params.id);
  try {
    if (relato == null) throw new Error("Relato não existe");

    res.send(relato);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.put("/:id", async function (req, res) {
  var relato = await Relato.findByPk(req.params.id);

  try {
    if (relato == null) throw new Error("Relato não existe");


    await relato.update(req.body);

    await relato.reload();

    res.send(relato);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.delete("/:id", async function (req, res) {
  var relato = await Relato.findByPk(req.params.id);
  try {
    if (relato == null) throw new Error("Relato não existe");

    await relato.destroy();
    
    res.send(true);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

module.exports = router;
