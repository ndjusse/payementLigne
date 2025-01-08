module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Moyen_de_paiement', {
        ID_MOYEN_DE_PAIEMENT: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        LABEL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        REF: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DESCRIPTION: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        API: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CLE: {
            type: DataTypes.STRING,
            allowNull: false
        },
        VALEUR: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        ENTREPRISE: {
            type: DataTypes.STRING,
            allowNull: false
        },
        IMG: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SITE: {
            type: DataTypes.STRING,
            allowNull: false  
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}