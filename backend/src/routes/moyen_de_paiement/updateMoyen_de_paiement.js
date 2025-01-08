const { Moyen_de_paiement } = require('../../db/sequelize')

module.exports = (app) => {
    app.put('/api/moyen_de_paiement', (req, res) => {
        const id = req.params.id
        Moyen_de_paiement.update(req.body, { where: {ID_MOYEN_DE_PAIEMENT: id}})    
            .then(_ => {
                Moyen_de_paiement.findByPk(id).then(mdp => {
                    const message = `Le mdp ${req.body.name} a été modifié.`
                    res.json({ message, data: mdp})
                }).catch(error => {
                    const message = "Le mdp ayant l'identifiant " + req.params.id + " n'a pas pu être trouver. Réessayer plutard."
                    res.status(500).json({ message, data: error})
                })
            })
            .catch(error => {
                const message = "Le mdp ayant l'identifiant " + req.params.id + " n'a pas pu être modifier. Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}