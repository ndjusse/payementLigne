const { Moyen_de_paiement } = require('../../db/sequelize')

module.exports = (app) => {
    app.post('/api/moyen_de_paiement', (req, res) => {
        Moyen_de_paiement.create(req.body)    
            .then(moyen_de_paiement => {
                const message = `Le moyen_de_paiement ${req.body.name} a été enregistré.`
                res.json({ message, data: moyen_de_paiement})
            })
            .catch(error => {
                const message = " Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}