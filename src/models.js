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
  lat:{
      type: Sequelize.DECIMAL(13,8)
  },
  lng:{
      type: Sequelize.DECIMAL(13,8)
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

const Ongs = database.define("ongs", {
  id:{
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  nome:{
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Preencher todos os campos necessários"
      }
    }
  },
  cnpj:{
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Preencher todos os campos necessários"
      }
    }

  },
  ceps:{
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Preencher todos os campos necessários"
      }
    }

  },
  rua:{
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Preencher todos os campos necessários"
      }
    }

  },
  numero:{
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Preencher todos os campos necessários"
      }
    }

    
    

  },
  bairro:{
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Preencher todos os campos necessários"
      }
    }

  },
  cidade:{
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Preencher todos os campos necessários"
      }
    }

  },
  uf:{
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Preencher todos os campos necessários"
      }
    }

  },    
  telefone:{
    type: Sequelize.STRING,
    allowNull: true
  },
  celular:{
    type: Sequelize.STRING,
    allowNull: true
  },  
  email:{
    type: Sequelize.STRING,
    allowNull: false,
    
    validate: {
      isEmail: {
        msg: "Preencha o E-mail corretamente"
      },
      notEmpty: {
        msg: "Preencher todos os campos necessários"
      }
    }
  },
  descricao:{
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Preencher todos os campos necessários"
      }
    }
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
  Ongs
};
