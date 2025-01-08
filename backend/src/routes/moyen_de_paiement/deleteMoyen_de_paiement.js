const { Moyen_de_paiement } = require('../../db/sequelize')

module.exports = (app) => {
    app.put('/api/moyen_de_paiement/:id', (req, res) => {
        Moyen_de_paiement.findByPk(req.body.id).then(moyen_de_paiement => {
            const moyen_de_paiementDeleted = moyen_de_paiement
            Moyen_de_paiement.destroy({
                where: {id: moyen_de_paiement.id}
            }).then(_ => {
                const message = `Le moyen_de_paiement avec l'identifiant ${req.body.name} a été supprimé.`
                res.json({ message, data: moyen_de_paiementDeleted})
            }).catch(error => {
                const message = "Le moyen_de_paiement ayant l'identifiant " + req.params.id + " n'a pas pu être supprimer. Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
        }).catch(error => {
            const message = "Le moyen_de_paiement ayant l'identifiant " + req.params.id + " n'a pas pu être trouver. Réessayer plutard."
            res.status(500).json({ message, data: error})
        })
    })
}   