const { body, checkSchema, sanitizeBody } = require('express-validator')

const name = {
  "name": {
    in: 'body',
    matches: {  
      options: [/^[\p{L}][ \p{L}-]*[\p{L}]$/u],
      errorMessage: "Invalid city name"
    }
  }
}

const region = {
  "region": {
    in: 'body',
    matches: {
      options: [/^[\p{L}][\p{L}-]*[\p{L}]$/u],
      errorMessage: "Invalid region"
    }
  }
}

module.exports = {
  add : [
   body('name')
      .isLength({min: 2, max: 30})
      .withMessage(`Name must be between 1 or max 15 length`)
      .trim(), 
    checkSchema(name),
    body('region')
      .isLength({min: 3, max: 30})
      .withMessage(`Value must be between 1 or max 15 length`)
      .trim(), 
    checkSchema(region),
    sanitizeBody('*').escape()
    ]
}
