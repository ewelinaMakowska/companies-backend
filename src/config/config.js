let envPath;

if(process.env.NODE_ENV === 'production' || !process.env.NODE_ENV) {
  envPath = '../.env.prod'
} else if (process.env.NODE_ENV === 'development') {
  envPath = '../.env.dev'
} else if (process.env.NODE_ENV === 'testing') {
  envPath = '../.env.test'
} else {
  envPath = '../.env.prod'
}

const dotenv = require('dotenv').config({path: envPath});


module.exports = { 
  port: process.env.PORT || 8000,
  db: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
      dialect: process.env.DB_DIALECT,
      host: process.env.HOST,
      operatorsAliases: process.env.DB_OPERATOR_ALIASES
    }
  },
  authentication: {
    jwtSecret: process.env.AUTH_JWT_SECRET
  }

}