const { checkSchema, body, sanitizeBody } = require('express-validator')

const Password = {
  "password": {
    in: 'body',
    matches: {
      options: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/, "i"],
      errorMessage: "Please enter a valid password - at least 8 characters etc."
    }
  }
}

module.exports = {
  registerUser : [
    body('eMail')
      .isEmail()
      .withMessage('Please enter a valid e-mail')
      .normalizeEmail(),
    body('firstName', 'Please enter a valid name')
      //.isAlpha()
      .isLength({min:2, max: 25})
      .trim(),
    body('lastName', 'Please enter a valid last name')
      //.isAlpha()
      .isLength({min:2, max: 25})
      .trim(),
    checkSchema(Password),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords have to match')
      } else {
        return true;
      }
    }) 
  ],

  loginUser : [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid e-mail')
      .normalizeEmail(),
    checkSchema(Password), 
  ] 

}


