const { Client } = require('../../db/sequelize')

module.exports = (app) => {
    app.put('/api/clients', (req, res) => {
        const id = req.params.id
        Client.update(req.body, { where: {ID_CLIENT:id}})    
            .then(_ => {
                Client.findByPk(id).then(client => {
                    const message = `Le client ${req.body.name} a été modifié.`
                    res.json({ message, data: client})
                }).catch(error => {
                    const message = "Le client ayant l'identifiant " + req.params.id + " n'a pas pu être trouver. Réessayer plutard."
                    res.status(500).json({ message, data: error})
                })
            })
            .catch(error => {
                const message = "Le client ayant l'identifiant " + req.params.id + " n'a pas pu être modifier. Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}