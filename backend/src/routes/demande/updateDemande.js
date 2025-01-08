const { Demande } = require('../../db/sequelize')

module.exports = (app) => {
    app.put('/api/demande', (req, res) => {
        const id = req.params.id
        Demande.update(req.body, { where: {ID_DEMANDE: id}})    
            .then(_ => {
                Demande.findByPk(id).then(demande => {
                    const message = `Le demande ${req.body.name} a été modifié.`
                    res.json({ message, data: demande})
                }).catch(error => {
                    const message = "Le demande ayant l'identifiant " + req.params.id + " n'a pas pu être trouver. Réessayer plutard."
                    res.status(500).json({ message, data: error})
                })
            })
            .catch(error => {
                const message = "Le demande ayant l'identifiant " + req.params.id + " n'a pas pu être modifier. Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}