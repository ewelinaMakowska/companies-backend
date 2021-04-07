const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}


const sequelize = new Sequelize (
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to database...')
  })
  .catch(err => {
    console.log('Unable to connect to database')
  })

  db['Company'] = sequelize.import('./Company.js')
  db['City'] = sequelize.import('./City.js')
  db['User'] = sequelize.import('./User.js')

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
  });
  
  
  db.sequelize = sequelize
  db.Sequelize = Sequelize
  module.exports = db

