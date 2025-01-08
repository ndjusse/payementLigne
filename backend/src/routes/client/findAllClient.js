const { Client } = require('../../db/sequelize')

module.exports = (app) => {
    app.get('/api/clients', (req, res) => {
        Client.findAll()    
            .then(clients => {
                const message = 'La liste des clients a bien été récupérée.'
                res.json({ message, data: clients})
            })
            .catch(error => {
                const message = "La liste des clients est indisponible. Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}