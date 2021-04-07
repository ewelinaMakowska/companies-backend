
const Sequelize = require('sequelize')
//const Company = require('./Company')
const Company = require('./Company')


module.exports = (sequelize, DataTypes) => {


  const City = sequelize.define('City', {
    id: { type: DataTypes.INTEGER(10), primaryKey : true, allowNull : false, unique : true, unsigned: true, autoIncrement: true},
    name: { type: DataTypes.STRING(45), allowNull : false, },
    region: { type: DataTypes.STRING(45), allowNull : false, },
  },  {
    freezeTableName: false, // Model tableName will be the same as the model name
    timestamps: false,
    underscored: true
  })

/* 
  City.associate = models => {
    Company.belongsTo(City, {foreignKey: 'cityid'});
    City.hasMany(Company, {foreignKey: 'id'})
  } */

 /*  City.associate = models => {
    Company.belongsTo(City);
    City.hasMany(Company)
  } */

   City.associate = (models) => {
    City.hasMany(models.Company, {
      as: 'Companies'
    });
  }  

  return City
}



