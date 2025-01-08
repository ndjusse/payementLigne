const { Paiement } = require('../../db/sequelize')

module.exports = (app) => {
    app.put('/api/paiement', (req, res) => {
        const id = req.params.id
        Paiement.update(req.body, { where: {ID_PAIEMENT: id}})    
            .then(_ => {
                Paiement.findByPk(id).then(paiement => {
                    const message = `Le paiement ${req.body.name} a été modifié.`
                    res.json({ message, data: paiement})
                }).catch(error => {
                    const message = "Le paiement ayant l'identifiant " + req.params.id + " n'a pas pu être trouver. Réessayer plutard."
                    res.status(500).json({ message, data: error})
                })
            })
            .catch(error => {
                const message = "Le paiement ayant l'identifiant " + req.params.id + " n'a pas pu être modifier. Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}