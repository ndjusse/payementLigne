module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Client', {
        ID_CLIENT: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NOM: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PRENOM: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PASSWORD: {
            type: DataTypes.STRING,
            allowNull: false
        },
        NUM_TEL: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        EMAIL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DATE_EXP: {
            type: DataTypes.DATE,
            allowNull: false
        },
        PAYS: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}