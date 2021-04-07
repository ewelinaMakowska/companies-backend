const Sequelize = require('sequelize')
//const City = require('./City')
const City = require('./City')




module.exports = (sequelize, DataTypes) => {

  const Company = sequelize.define('Company', {
    id: { type: DataTypes.INTEGER(10), primaryKey : true, allowNull : false, unique : true, unsigned: true, autoIncrement: true },
    name: { type: DataTypes.STRING(45), allowNull : false },
    cityid: { type: DataTypes.INTEGER(10), allowNull : false},
    price: { type: DataTypes.DOUBLE(5,2),  allowNull : false },
    logo: { type: DataTypes.STRING(45) },
    description: { type: DataTypes.TEXT },
    email: { type: DataTypes.STRING(45) },  
    lumpSum: { type: DataTypes.BOOLEAN },
    ledger: { type: DataTypes.BOOLEAN },
    inPerson: { type: DataTypes.BOOLEAN },
    remote: { type: DataTypes.BOOLEAN },
    additionalPoints: { type: DataTypes.TEXT },

  },  {
    freezeTableName: false, // Model tableName will be the same as the model name
    timestamps: false,
    underscored: true
  })

  Company.associate = (models) => {
    Company.belongsTo(models.City, {
      foreignKey: 'cityid',
      targetKey: 'id',
      as: 'City'
    })
  };
  
  return Company
}



// id name price logo description
// int(10) unsigned not null primary key autogenerate unigue,
// varchar(45) not null
//double(5,2) not null unsigned
//logo varchar(45)
//description text