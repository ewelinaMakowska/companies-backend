const {checkSchema, body, sanitizeBody } = require('express-validator')

const name = {
  "name": {
    in: 'body',
    matches: {  
      options: [/^[\p{L}][ \p{L}-]*[\p{L}]$/u],
      errorMessage: "Invalid name"
    }
  }
}

const message = {
  "message": {
    in: 'body',
    matches: {  
      options: [/^[\p{L}][ \.,!?\p{L}-]*[.!?\p{L}]$/u],
      errorMessage: "Invalid message"
    }
  }
}

module.exports = {

  email : [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid e-mail')
      .custom((value, { req }) => {  /* custom validator to check if mail is verified by MailGun (sandbox bersion */
        if ((value.toLowerCase() !== 'client_first@interia.pl') && (value.toLowerCase() !== 'client_second@interia.pl')) {
          throw new Error("This e-mail address is not verified by MailGun");
        }
        return true;
      })
      .withMessage('Unverified e-mail - for now we use MailGun sandbox version')
      .normalizeEmail(), //partially 'blocked' by custom validator
    body('name')
      .isLength({min: 2, max: 25})
      .withMessage('Invalid name: length')
      .trim(),
    checkSchema(name),
    body('message')
      .isLength({min: 3, max: 400})
      .withMessage('Invalid message: length')
      .trim(),
    checkSchema(message),
    sanitizeBody('*').escape()
  ]

}