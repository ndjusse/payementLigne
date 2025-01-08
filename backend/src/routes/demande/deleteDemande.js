const { Demande } = require('../../db/sequelize')

module.exports = (app) => {
    app.put('/api/demande/:id', (req, res) => {
        Demande.findByPk(req.body.id).then(demande => {
            const demandeDeleted = demande
            Demande.destroy({
                where: {id: demande.id}
            }).then(_ => {
                const message = `La demande avec l'identifiant ${req.body.name} a été supprimé.`
                res.json({ message, data: demandeDeleted})
            }).catch(error => {
                const message = "La demande ayant l'identifiant " + req.params.id + " n'a pas pu être supprimer. Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
        }).catch(error => {
            const message = "La demande ayant l'identifiant " + req.params.id + " n'a pas pu être trouver. Réessayer plutard."
            res.status(500).json({ message, data: error})
        })
    })
}   