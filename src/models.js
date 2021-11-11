const Sequelize = require("sequelize");

const database = new Sequelize("mysql://root:@localhost:3306/moradorderua");

const Usuario = database.define("usuario", {
  id:{
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
  },
  nome:{
      type: Sequelize.STRING,
      allowNull: false
  },
  email:{
      type: Sequelize.STRING,
      allowNull: false,
      isEmail: true
  },
  documento:{
      type: Sequelize.STRING,
      allowNull: false
  },
  telefone:{
    type: Sequelize.STRING,
    allowNull: false
  },
  senha:{
      type: Sequelize.STRING,
      allowNull: false, 
  }
});

const Relato = database.define("relato", {
  id:{
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
  },
  sexo:{
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
      notEmpty: {
        msg: "Preencher o campo sexo"
      }
    }
  },
  condicaoFisica:{
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Preencher o campo de condições físicas"
        }
      }
  },
  caracteristicas:{
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Preencher o campo de características"
        }
  }
}
});

const Endereco = database.define("endereco", {
  id:{
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
  },
  logradouro:{
      type: Sequelize.STRING,
      allowNull: false
  },
  bairro:{
      type: Sequelize.STRING,
      allowNull: false
  },
  cidade:{
      type: Sequelize.STRING,
      allowNull: false
  },
  estado:{
      type: Sequelize.STRING,
      allowNull: false
  },
  longitude:{
      type: Sequelize.DECIMAL,

  },
  latitude:{
      type: Sequelize.DECIMAL
  }
});

const TipoUsuario = database.define("tipoUsuario", {
  id:{
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
  },
  nome:{
      type: Sequelize.STRING,
      allowNull: false
  }
});

const Doacao = database.define("doacao", {
  id:{
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
  },
  cartaoCredito:{
      type: Sequelize.STRING(16),
      allowNull: false,
      isCreditCard: true
  },
  qrCode:{
      type: Sequelize.TEXT,
      allowNull: false
  },
  boleto:{
      type: Sequelize.STRING,
      allowNull: false
  }
});

const Ong = database.define("ong", {
  id:{
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  nome:{
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  telefone:{
    type: Sequelize.STRING,
    allowNull: false
  },
  endereco:{
    type: Sequelize.STRING,
    allowNull: false
  },

});

Usuario.hasMany(Relato);
Relato.belongsTo(Usuario);

Usuario.belongsTo(TipoUsuario);
TipoUsuario.hasMany(Usuario);

Usuario.hasMany(Doacao);
Doacao.belongsTo(Usuario);

Relato.belongsTo(Endereco);
Endereco.hasOne(Relato);

module.exports = {
  Usuario,
  Relato,
  Endereco,
  TipoUsuario,
  Doacao,
  database,
  Ong
};
