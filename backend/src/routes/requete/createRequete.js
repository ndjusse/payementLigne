const { Requete } = require('../../db/sequelize')

module.exports = (app) => {
    app.post('/api/requete', (req, res) => {
        Requete.create(req.body)    
            .then(requete => {
                const message = `Le requete ${req.body.name} a été enregistré.`
                res.json({ message, data: requete})
            })
            .catch(error => {
                const message = " Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}