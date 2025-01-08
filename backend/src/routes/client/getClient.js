const { Client } = require('../../db/sequelize')
const { Op } = require("sequelize");
module.exports = (app) => {
    app.get('/api/clients/list/:id', (req, res) => {
        Client.findAll({
            where: {
                ID_CLIENT: {
                    [Op.ne]:req.params.id
                }
            }
            }
        )    
            .then(clients => {
                const message = 'La liste des clients a bien été récupérée.'
                res.json({ message, data: clients})
            })
            .catch(error => {
                const message = "La liste des clients est indisponible. Réessayer plutard."
                res.status(500).json({ message, data: error})
            })
    })
}