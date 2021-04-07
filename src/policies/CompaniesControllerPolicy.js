const { query, body, sanitizeBody, sanitizeQuery} = require('express-validator')


module.exports = {
  search : [
    query('searchValue')
      .isAlphanumeric()
      .withMessage('Please enter an alphanumeric value')
      .isLength({min: 1, max: 15})
      .withMessage(`Value must be between 1 or max 15 length`)
      .trim(),
    query('page')
      .isInt()
      .withMessage('Please enter an int')
      .isLength({min: 1, max: 2})
      .withMessage('Please enter a number of length between min 1 and max 2')
      .trim(),
      sanitizeQuery('*').escape()
    ],

    add : [
      body('name')
        .isLength({min: 2, max: 30})
        .withMessage(`Name must be between 1 or max 30 length`)
        .trim(),
      body('description')
        .isLength({min: 3, max: 350})
        .withMessage('Description must be at least 3 characters long and max 250')
        .trim(),
      body('cityId')
        .isLength({min: 1, max: 3})
        .withMessage('cityid min length 1')
        .isInt({min: 1})
        .withMessage('City id must be an int greater than zero')
        .trim(),
      body('price')
        .isLength({min: 1, max: 6})
        .withMessage('Price must be at least 1 characters long and max 6')
        .isDecimal({min:1})
        .withMessage('Price must be a decimal value')
        .trim(),
      body('email')
        .isEmail()
        .withMessage('Email must be an email')
        .normalizeEmail()
        .trim(),
      body('additionalData')
        .isLength({max: 150})
        .withMessage('Additional info must be min 3 characters long, max 50')
        .trim(),
      body('ledger')
        .isBoolean()
        .withMessage('ledger must be boolean'),
      body('lumpSum')
        .isBoolean()
        .withMessage('lump sum must be boolean'),
      body('inPerson')
        .isBoolean()
        .withMessage('inPerson must be boolean'),
      sanitizeBody('*').escape()
    ]

}
