const { City } = require('../models')
const { Op } = require('sequelize');


module.exports = async (req, res, next) => {  
    try {
      const cities = await City.findAll({
        where: {
          [Op.and]: [
            {name: req.body.name},
            {region: req.body.region}
          ]
        }
      })

      console.log(cities)

      if(cities.length == 0) {
        console.log('city doesnt exist')
        next()
      } else {
        console.log('city already exist')
        res.status(204).send('city already exists')
      }
    } catch (err) {
      console.log('unable to check if city exist')
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
}
 
