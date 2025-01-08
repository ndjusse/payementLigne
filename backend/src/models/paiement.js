module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Paiement', {
        ID_PAIEMENT: {
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
        NUM_PAYANT: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        NUM_RECE: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        NUM_TRANS: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: true
        },
        DATE_PAIEMENT: {
            type: DataTypes.DATE,
            allowNull: false
        },
        MONTANT: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        ETAT: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ACTIF: {
            type: DataTypes.INTEGER,
            allowNull: false
        }  
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}