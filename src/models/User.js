const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
//const { try } = require('bluebird');

 async function HashPassword(user) {
  const SALT_ROUNDS = 9;
  console.log('HASH PASS FUNCTION')
  
  if(!user.changed('password')) {
    return;
  }

/*   bcrypt.genSalt(SALT_ROUNDS, (err, SALT) => {
     bcrypt.hash(user.password, SALT, (err, hash) => {
       user.password = hash
     });
  });  */ 

   try {
    bcrypt.genSalt(SALT_ROUNDS)
    .then((SALT) => {
      try {
        bcrypt.hash(user.password, SALT)
        .then((hash) => {
          user.password = hash
        })
      } catch(err) {
        console.log(err)
      }
    })
  } catch(err) {
    console.log(err)
  } 
 }


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {

    firstname: {
       type: DataTypes.STRING(45)
    },

    lastname: { 
      type: DataTypes.STRING(45)
    },

    email: { 
      type: DataTypes.STRING(45), 
      unique: true,
      allowNull: false 
    },

    password: { 
      type: DataTypes.STRING(200),
      allowNull: false 
    },

    role: { 
      type: DataTypes.STRING(45), 
      defaultValue: 'basic' 
    }, 

    id: { 
      type: DataTypes.INTEGER(10), 
      primaryKey : true, 
      unique : true, 
      unsigned: true, 
      autoIncrement: true,
      allowNull: false 
    }
  },  
  {
    freezeTableName: false, // Model tableName will be the same as the model name
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: HashPassword,
      beforeUpdate: HashPassword,
      beforeSave: HashPassword
    }
  })

  /* User.prototype.comparePassword = function(password) {
    return bcrypt.compareAsync(password, this.password)
  } */

  return User
}
