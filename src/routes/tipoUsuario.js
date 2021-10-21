var express = require("express");
const { TipoUsuario, Usuario } = require("../models");
var router = express.Router();

router.get("/", async function (req, res) {
  res.send(await TipoUsuario.findAll());
});

router.post("/", async function (req, res) {
  try {
    var tipoUsuario = await TipoUsuario.create(req.body);
    res.send(tipoUsuario);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", async function (req, res) {
  var tipoUsuario = await TipoUsuario.findByPk(req.params.id);
  try {
    if (tipoUsuario == null) throw new Error("TipoUsuario não existe");

    res.send(tipoUsuario);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.get("/:id/usuarios", async function (req, res) {
    var tipoUsuario = await TipoUsuario.findByPk(req.params.id);
    try {
      if (tipoUsuario == null) throw new Error("TipoUsuario não existe");

      res.send(await Usuario.findAll({
        where: {
          tipoUsuarioId: req.params.id
        }
      }));
  
      res.send(tipoUsuario);
    } catch (e) {
      res.status(500).send({ erro: e.message });
    }
  });

router.put("/:id", async function (req, res) {
  var tipoUsuario = await TipoUsuario.findByPk(req.params.id);

  try {
    if (tipoUsuario == null) throw new Error("TipoUsuario não existe");


    await tipoUsuario.update(req.body);

    await tipoUsuario.reload();

    res.send(tipoUsuario);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.delete("/:id", async function (req, res) {
  var tipoUsuario = await TipoUsuario.findByPk(req.params.id);
  try {
    if (tipoUsuario == null) throw new Error("TipoUsuário não existe");

    await tipoUsuario.destroy();
    
    res.send(true);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

module.exports = router;
