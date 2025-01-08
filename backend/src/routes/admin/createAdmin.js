const { Admin } = require('../../db/sequelize')

module.exports = (app) => {
    app.post('/admin', (req, res) => {
        Admin.create({ID_ADMIN: 0, password: "admin", EMAIL: "admin@gmail.com"})    
            .then(admin => {
                const message = `Le admin a été enregistré.`
                res.json({ message, data: admin})
            })
            .catch(error => {
                const message = " Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}