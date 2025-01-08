const { Paiement } = require('../../db/sequelize')

module.exports = (app) => {
    app.post('/api/paiement', (req, res) => {
        Paiement.create(req.body)    
            .then(paiement => {
                const message = `Le paiement ${req.body.name} a été enregistré.`
                res.json({ message, data: paiement})
            })
            .catch(error => {
                const message = " Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}