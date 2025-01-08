const { Paiement } = require('../../db/sequelize')

module.exports = (app) => {
    app.get('/api/paiement/tel/:num', (req, res) => {
        Paiement.findAll({
            where: {
                NUM_RECE: req.params.num
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