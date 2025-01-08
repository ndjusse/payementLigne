const { Client } = require('../../db/sequelize')

module.exports = (app) => {
    app.post('/api/clients', (req, res) => {
        Client.create(req.body)    
            .then(clients => {
                const message = `Le client ${req.body.name} a été enregistré.`
                res.json({ message, data: clients})
            })
            .catch(error => {
                const message = " Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}