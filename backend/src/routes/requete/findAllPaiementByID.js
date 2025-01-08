const { Paiement } = require('../../db/sequelize')

module.exports = (app) => {
    app.get('/api/paiementbyclient/:id', (req, res) => {
        Paiement.findOne({
            where: {
                ID_CLIENT: req.params.id
            }
            }) 
            .then(paiement => {
                const message = `Le client ayant l'identifiant a été récupéré.`
                res.json({ message, data: paiement})
            })
            .catch(error => {
                const message = "Le client ayant l'identifiant est indisponible. Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}