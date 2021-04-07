const { getUserData } = require("../controllers/AuthController")

const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

module.exports = {

  async getUserData(req) {
    const userData = await User.findOne({
      where: {
        email: req.body.email
      },
      raw : true
  })

  return userData;
}

 /*  async compareHash(req, user) {
    bcrypt.compare(req.body.password, user.password, (err, res) => {
      if(err) {
        return false
      }
      if(res) {
        return true
      } else {
        return false
      }
    })
  } */
}
 
