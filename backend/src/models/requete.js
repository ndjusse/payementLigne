// Modèle de l'entité Requête
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Requete', {
        ID_Requete: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        contenu: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expediteur: {
            type: DataTypes.STRING,
            allowNull: false
        },
       
       
       
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}