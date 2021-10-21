const sequelize = require("sequelize");
const Sequelize = require("sequelize");

const database = new Sequelize("mysql://root:@localhost:3306/vendas");

const Usuario = database.define("usuarios", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
    unique: true,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
    is: /^[0-9a-f]{64}$/i,
  },
});

const Produto = database.define("produtos", {
  id:{
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  nome:{
    type: Sequelize.STRING,
    allowNull: false
  },
  preco:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  quantidadeEstoque:{
    type: Sequelize.INTEGER,
    allowNull: false
  }  
});

const Categoria = database.define("categorias", {
  id:{
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  nome:{
    type: Sequelize.STRING,
    allowNull: false
  }
});

Categoria.hasMany(Produto);
Produto.belongsTo(Categoria);

module.exports = {
  database,
  Usuario,
  Produto,
  Categoria
};
