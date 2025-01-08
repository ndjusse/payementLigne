const { Demande } = require('../../db/sequelize')

module.exports = (app) => {
    app.get('/api/demande', (req, res) => {
        Demande.findAll()    
            .then(demande => {
                const message = 'La liste des demandes a bien été récupérée.'
                res.json({ message, data: demande})
            })
            .catch(error => {
                const message = "La liste des demandes est indisponible. Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}