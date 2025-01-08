module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Demande', {
        ID_DEMANDE: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ID_CLIENT: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        MESSAGE: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SITE_MDP: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LIB_MDP: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ETAT: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}