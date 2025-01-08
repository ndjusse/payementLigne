const { Depot } = require('../../db/sequelize')

module.exports = (app) => {
    app.get('/api/depot/:id', (req, res) => {
        Depot.findAll({
            where: {
                ID_CLIENT: req.params.id
            }
            }) 
            .then(depot => {
                const message = `Le client ayant l'identifiant a été récupéré.`
                res.json({ message, data: depot})
            })
            .catch(error => {
                const message = "Le client ayant l'identifiant est indisponible. Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}