const { Moyen_de_paiement } = require('../../db/sequelize')

module.exports = (app) => {
    app.get('/api/moyen_de_paiement', (req, res) => {
        Moyen_de_paiement.findAll()    
            .then(moyen_de_paiement => {
                const message = 'La liste des moyen_de_paiement a bien été récupérée.'
                res.json({ message, data: moyen_de_paiement})
            })
            .catch(error => {
                const message = "La liste des moyen_de_paiement est indisponible. Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}