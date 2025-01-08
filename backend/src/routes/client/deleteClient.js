const { Client } = require('../../db/sequelize')

module.exports = (app) => {
    app.put('/api/clients/:id', (req, res) => {
        Client.findByPk(req.body.id).then(client => {
            const clientDeleted = client
            Client.destroy({
                where: {id: client.id}
            }).then(_ => {
                const message = `Le client avec l'identifiant ${req.body.name} a été supprimé.`
                res.json({ message, data: clientDeleted})
            }).catch(error => {
                const message = "Le client ayant l'identifiant " + req.params.id + " n'a pas pu être supprimer. Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
        }).catch(error => {
            const message = "Le client ayant l'identifiant " + req.params.id + " n'a pas pu être trouver. Réessayer plutard."
            res.status(500).json({ message, data: error})
        })
    })
}   