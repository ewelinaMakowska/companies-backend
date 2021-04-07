const jwt = require('jsonwebtoken');
const config = require('../config/config.js')

module.exports = (req, res, next) => {
  if(!req.get('Authorization')) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  } else {
    try {
      const token = req.get('Authorization').split(' ')[1];
      const decodedToken = jwt.verify(token, config.authentication.jwtSecret);
      req.role = decodedToken.role;
      req.email = decodedToken.email;
      next();
    } catch(error) {
      error.statusCode = 500;
      throw error
    }
  }
}