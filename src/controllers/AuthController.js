
const { User } = require('../models')
const expressValidator = require('express-validator');
const bcrypt = require('bcryptjs');
const loginHelper = require('../helpers/loginHelper')
const { jwtRegUser } = require('../helpers/authHelper')


module.exports = {
   async registerUser(req, res) {
    const errors = expressValidator.validationResult(req);
   
    if(errors.isEmpty()) {
      try  {
        console.log(req.body)

        const user = {
          email: req.body.eMail,
          password: req.body.password,
          firstname: req.body.firstName,
          lastname: req.body.lastName
        } 

        console.log(user)

        let resultEntity = await User.create(user)
        const userObj = resultEntity.get({plain: true})

        return res.status(201).send({
          user : userObj,
          token: jwtRegUser(userObj)
        })
         
                   
      } catch (err) {
        console.log(err)
        res.status(400).send({
          error: err
        })
      }
    } else {
      res.status(422).send({
        error: errors
      })
    }
  },  //registerUser end




  async login(req, res) {
    //console.log(req.body)
    const errors = expressValidator.validationResult(req)

  /*   for(property in errors) {
      console.log(errors[property])
    } */

    if(errors.isEmpty()){
      try {
        const { email, password } = req.body;
        var user;

        //check if there is user with this email in db
        user = await loginHelper.getUserData(req);
        console.log(user)
        
        if(!user) {
          return res.status(403).send({
            error: 'Invalid login/email information'
          })
        } else { 
          //SYNC
          let isPasswordValid = bcrypt.compareSync(password, user.password)      
         
          if(isPasswordValid) {    
            res.status(200).send({
              user : user,
              token: jwtRegUser(user)
            }) 
            return

          } else {
            res.status(403).send()
            return
          }   
        } //else
      
      } catch(err) { 
        console.log(err)
        res.status(500).send({
          error: err
        })
        return err
      } //catch end

    } else { //errors is empty else
      res.status(422).send({
        error: errors
      })
      return errors
    } //errors is empty else end
  }, //login end



 

} //module exports end