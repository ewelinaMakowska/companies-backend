const sendMail = require('../mail')
const { validationResult } = require('express-validator')

module.exports = {

  mailCompany (req, res, next) {
    
    console.log('Data on server:')
    console.log(`Data sender ${req.body.email}`);
    console.log(`Message ${req.body.message}`);
    console.log(`To ${req.body.company}`);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ error: `Validation failed: ${errors.array()[0].msg}` });
    } else {
      sendMail(req.body.email,
        req.body.company, 
        'Formularz kontaktowy',
         req.body.message, 
         function(err, data) {
           if(err) {
             res.sendStatus(500).json({ error: 'Internal error'});
           } else {
             sendMail('companies-catalogue@op.pl', 
             req.body.email, 
             'Potwierdzenie wysłania formularza', 
             'Dziękujemy za wypełnienie formularza', 
             function(err, data) {
               if(err) {
                 res.status(500).json({ error: 'Failed to send confirmation e-mail.'});
               } else {
                 res.status(200).json({ message: 'E-mails sent!'});
               }
             }); //sendMail end
           } // else block end
       });  // send Mail end  
    }
   


  } //mail company end

} //module exports end