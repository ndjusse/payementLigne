module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Depot', {
        ID_DEPOT: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ID_CLIENT: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ID_MOYEN_DE_PAIEMENT: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        DATE_DEPOT: {
            type: DataTypes.DATE,
            allowNull: false
        },
        MONTANT: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}