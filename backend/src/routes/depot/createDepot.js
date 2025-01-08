const { Depot } = require('../../db/sequelize')

module.exports = (app) => {
    app.post('/api/depot', (req, res) => {
        Depot.create(req.body)    
            .then(depot => {
                const message = `Le depot ${req.body.name} a été enregistré.`
                res.json({ message, data: depot})
            })
            .catch(error => {
                const message = " Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}