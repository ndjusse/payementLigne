const { Client } = require('../../db/sequelize')
const jwt = require('jsonwebtoken')
module.exports = (app) => { 

app.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  console.log(decoded)
//     Client.findOne({
//     where: {
//       id: decoded.id
//     }
//   })
//     .then(user => {
//       if (user) {
//         res.json(user)
//       } else {
//         res.send('User does not exist')
//       }
//     })
//     .catch(err => {
//       res.send('error: ' + err)
//     })
})
}
