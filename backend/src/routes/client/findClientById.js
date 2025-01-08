const { Client } = require('../../db/sequelize')

module.exports = (app) => {
    app.get('/api/clients/:id', (req, res) => {
        Client.findByPk(req.params.id)    
            .then(clients => {
                const message = `Le client ayant l'identifiant ${req.params.id} a été récupéré.`
                res.json({ message, data: clients})
            })
            .catch(error => {
                const message = "Le client ayant l'identifiant " + req.params.id + " est indisponible. Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}