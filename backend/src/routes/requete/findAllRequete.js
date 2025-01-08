const { Paiement } = require('../../db/sequelize')

module.exports = (app) => {
    app.get('/api/paiement', (req, res) => {
        Paiement.findAll()    
            .then(paiement => {
                const message = 'La liste des paiement a bien été récupérée.'
                res.json({ message, data: paiement})
            })
            .catch(error => {
                const message = "La liste des paiement est indisponible. Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}