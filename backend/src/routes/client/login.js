const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { Client } = require('../../db/sequelize')

users.use(cors())

process.env.SECRET_KEY = 'secret'

// users.post('/register', (req, res) => {
//   const today = new Date()
//   const userData = {
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     email: req.body.email,
//     password: req.body.password,
//     created: today
//   }

//   Client.findOne({
//     where: {
//       email: req.body.email
//     }
//   })
//     //TODO bcrypt
//     .then(user => {
//       if (!user) {
//         bcrypt.hash(req.body.password, 10, (err, hash) => {
//           userData.password = hash
//           User.create(userData)
//             .then(user => {
//               res.json({ status: user.email + 'Registered!' })
//             })
//             .catch(err => {
//               res.send('error: ' + err)
//             })
//         })
//       } else {
//         res.json({ error: 'User already exists' })
//       }
//     })
//     .catch(err => {
//       res.send('error: ' + err)
//     })
// })
module.exports = (app) => { 
  app.post('/login', (req, res) => {
        Client.findOne({
            where: {
              NUM_TEL: req.body.tel
            }
        })
        .then(user => {
          if (user) {
            if (bcrypt.compareSync(req.body.password, user.PASSWORD)) {
              let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
              })
              res.send(token)
            }
            res.send(user.dataValues);
          } else {
            res.status(400).json({ error: 'User does not exist' })
          }
        })
        .catch(err => {
          console.log(2);
          res.status(400).json({ error: err })
        })
    })
}



