const { Company, City, sequelize } = require('../models/')
const ITEMS_PER_PAGE = 9;
const { Op, where } = require('sequelize');
const { validationResult } = require('express-validator');


module.exports = {

  

  async get (req, res) {
    try {
      const companies = await Company.findAndCountAll({
        offset: 0,
        limit: 150
      })
      res.send(companies)
    } catch (error) {
      res.status(500).send({
        error: 'Internal Server Error'
      });
    }
  },



  // async countAll (req, res) {
  //   try {
  //     const howManyRows = await Company.count();
  //     res.send(howManyRows)
  //   } catch (error) {
  //     res.status(500).send({
  //       error: 'Internal Server Error'
  //     });
  //   }
  // },

  async getFirstLimited (req, res) {
    try {
      const companies = await Company.findAndCountAll({
        offset: 0,
        limit: 9
      })
      res.send(companies)
    } catch (error) {
      res.status(500).send({
        error: 'Internal Server Error'
      });
    }
  },

  
  async getLimited (req, res, next) {
    try {
       const page = req.query.page;
       const sort = req.query.sort;
       let accounting = req.query.accounting;
       let order;
       let where;
       let companies;

       if(!sort) {
        order = [['id', 'asc']]
       } else {
         orderName =  sort.split('_')[0];
         orderOrder = sort.split('_')[1];
   
         order = [orderName, orderOrder]
       }
  
     
      companies = await Company.findAndCountAll({
        attributes: ['name', 'price', 'id', 'description'],
        order: [order],
        offset: (page-1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
        include:[
          { model: City, 
            as: 'City',
            attributes: ['name', 'region'],
            required: false //left join
            }
          ]
      
      })
      res.send(companies);
   
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: 'Internal Server Error'
      });
    }
 
  },

    async getFiltered(req, res, next) {
      try {
        const value = req.query.city;
        console.log(`Przekazana wartość do kontrolera: ${value}`)
         //const page = '3';
         //const page = 3;   
      
            const companies = await Company.findAll({
            where: {
              [Op.and]: [
                {city: {[Op.like]: `%${value}%`}},                      
                {lump_sum: 1}
              ]
            }
          })    
        res.send(companies);
     
      } catch (error) {
        res.status(500).send({
          error: 'Internal Server Error'
        });
      } 
    },

  //EAGER LOADING
  async getFilteredLimited(req, res, next) {
    console.log(req.query);
   try {
    const page = req.query.page;
    let value = req.query.city;
    const sort = req.query.sort;
    let accounting = req.query.accounting;
    let contact = req.query.contact

    let order;
    let orderName;
    let orderOrder;
    let companies;
    let whereCityId;
    let whereAccountingName;
    let whereAccountingValue;
    let whereContactName;
    let whereContactValue;

    if(!sort) {
     order = [['id', 'asc']]
    } else {
      orderName = sort.split('_')[0];
      orderOrder = sort.split('_')[1];

      order = [orderName, orderOrder]
    }

    if(!accounting) {
      whereAccountingName = ''
      whereAccountingValue = ''
    }
    else if(accounting == 'ledger') {
        whereAccountingName = 'ledger';
        whereAccountingValue = 1
    }
    else if(accounting == 'lump_sum') {
        whereAccountingName = 'lumpSum';
        whereAccountingValue = 1
      }
    

    console.log(whereAccountingName)
    console.log(whereAccountingValue)
    console.log('')

    if(!contact) {
      whereContactName = '',
      whereContactValue = ''
    }

    else if(contact == 'in_person') {
        whereContactName = 'inPerson';
        whereContactValue = 1
    }
    else if(contact == 'remote') {
        whereContactName = 'remote';
        whereContactValue = 1
      }

    if(value) {
      whereCityId = 'cityId'
    } else {
      whereCityId = 'remote'
      value = 1
    }

     companies = await Company.findAndCountAll(
       { 
      attributes: ['name', 'id', 'price', 'description'],
       offset: (page-1) * ITEMS_PER_PAGE,
       order: [order],
       limit: ITEMS_PER_PAGE,
       where: {
         [Op.and]: [
          {[whereCityId]: value},
          {[whereAccountingName]: 1},
          {[whereContactName]: 1}
         ]
         },
       include:[
        { model: City, 
          as: 'City',
          attributes: ['name', 'region'],
          required: false //left join
          }
        ] 
     })

     console.log(companies)  

     res.send(companies);
  
   } catch (error) {
    console.log(error);
     res.status(500).send({
       error: 'Internal Server Error'
     });
     
   } 
 },   


  async getOne (req, res, next) {
    try {
      const id = req.params.id
      const companies = await Company.findOne({
        attributes: ['name', 'description', 'price', 'email', 'logo', 'ledger', 'lump_sum', 'in_person', 'remote', 'id', 'cityId', 'additional_points'],
        where: {id: id},
        include : [{
          attributes: ['name', 'region'],
          model: City,
          as: 'City',
          required: false //left join
        }
        ]
      })
      
      //const companies = await Company.findByPk({ where: { id: id}});
      res.send(companies)
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: 'Internal Server Error'
      });
    }
  },


 

  // async getLimited (req, res, next) {
  //   try {
  
  //     const companies = await Company.findAndCountAll({
  //       offset: 4,
  //       limit: 4
  //     })
  //     res.send(companies)
  //   } catch (error) {
  //     res.status(500).send({
  //       error: 'Internal Server Error'
  //     });
  //   }
  // }


  async getByNameOrID(req, res) {
 
    const errors = validationResult(req);
    console.log(req.body.searchValue)
    console.log(req.body.page)


    if(errors.isEmpty()) {
      console.log('GET NAME OR ID!!!')
      console.log(req.query);
      const searchValue = req.query.searchValue;
      const page = req.query.page

      try {
        const companies = await Company.findAndCountAll(
          { 
         attributes: ['name', 'id'],
          offset: (page-1) * ITEMS_PER_PAGE,
         // order: [order],
          limit: ITEMS_PER_PAGE,
          where: {
            [Op.or]: [
             {id: searchValue},
             {name: searchValue}
            ]
            },
          include:[
           { model: City, 
             as: 'City',
             attributes: ['name', 'region'],
             required: false //left join
             }
           ] 
        })
  
        console.log(companies)  
  
        res.status(200).send(companies);
   
      } catch(err) {
        console.log(err)
        res.status(500).send({
          error: 'Internal Server Error'
        });
      }
    } else {
      res.status(422).send({
        error: errors
      })
    } 
},


async deleteCompany(req, res) {
  try {
    for (let property in req.params.companyId) {
      console.log(property, property.value)
    }
    console.log(req.params.companyId)
    
    let n = await Company.destroy({ where: { id: req.params.companyId } });
    console.log(`number of deleted rows: ${n}`);
    res.status(200).send(n)
  } catch(err) {
    console.log(err)
    res.status(204).send({
      errors: err
    })
  }

},



async addCompany(req, res) {
  const errors = validationResult(req);

  console.log(req.body)
  console.log(' ')

  if(!errors.isEmpty()){
    return res.status(422).send({
      error: errors
    })
  } else {
    try {   
      const company = await Company.create({
        name: req.body.name,
        cityid: req.body.cityId,
        price: req.body.price,
        description: req.body.description,
        email: req.body.email,
        ledger: req.body.ledger,
        lumpSum: req.body.lumpSum,
        inPerson: req.body.inPerson,
        remote: true})
      console.log(`added company: ${company.name}`);
      res.status(200).send(company)
    } catch(err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
  }
 

},


async updateCompany(req, res) {
    try {   
      const company = await Company.update(req.body, {where: {id: req.params.id}})
      console.log(`updated company: ${company.name}`);
      res.status(200).send(company)
    } catch(err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }  
}





}