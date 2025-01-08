const { Demande } = require('../../db/sequelize')

module.exports = (app) => {
    app.post('/api/demande', (req, res) => {
        Demande.create(req.body)    
            .then(demande => {
                const message = `Le client ${req.body.name} a été enregistré.`
                res.json({ message, data: demande})
            })
            .catch(error => {
                const message = " Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}