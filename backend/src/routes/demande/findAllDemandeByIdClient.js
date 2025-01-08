const { Demande } = require('../../db/sequelize')

module.exports = (app) => {
    app.get('/api/demandebyidclient/:id', (req, res) => {
        Demande.findAll({
            where: {
                ID_CLIENT: req.params.id
            }
            }) 
            .then(demande => {
                const message = `Le client ayant l'identifiant a été récupéré.`
                res.json({ message, data: demande})
            })
            .catch(error => {
                const message = "Le client ayant l'identifiant est indisponible. Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}