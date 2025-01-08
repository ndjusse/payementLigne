const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { Admin } = require('../../db/sequelize')

process.env.SECRET_KEY = 'secret'

module.exports = (app) => { 
  app.post('/loginAdmin', (req, res) => {
      Admin.findOne({
            where: {
              EMAIL: req.body.email
            }
        })
        .then(admin => {
          if (admin) {
            if (bcrypt.compareSync(req.body.password, admin.password)) {
              let token = jwt.sign(admin.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
              })
              res.send(token)
            }
            res.send(admin.dataValues);
          } else {
            res.status(400).json({ error: 'admin does not exist' })
          }
        })
        .catch(err => {
          console.log(2);
          res.status(400).json({ error: err })
        })
    })
}



