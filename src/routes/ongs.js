var express = require("express");
const auth = require("../auth");
const { Ong } = require("../models");
var router = express.Router();

router.get("/", auth, async function (req, res) {
  res.send(await Ong.findAll());
});

router.post("/", async function (req, res) {
  try {
    var ong = await Ong.create(req.body);
    res.send(ong);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", async function (req, res) {
  var ong = await Ong.findByPk(req.params.id);
  try {
    if (ong == null) throw new Error("Ong não existe");

    res.send(usuario);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.put("/:id", async function (req, res) {
  var ong = await Ong.findByPk(req.params.id);

  try {
    if (ong == null) throw new Error("Ong não existe");


    await ong.update(req.body);

    await ong.reload();

    res.send(usuario);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.delete("/:id", async function (req, res) {
  var ong = await Ong.findByPk(req.params.id);
  try {
    if (ong == null) throw new Error("Ong não existe");

    await ong.destroy();
    
    res.send(true);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

module.exports = router;
