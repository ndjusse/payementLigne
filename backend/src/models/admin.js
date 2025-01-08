module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Admin', {
        ID_ADMIN: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
       
        EMAIL: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    });
    // Définition de la relation avec l'entité Requête
  Admin.hasMany(models.Requete, { foreignKey: 'adminId' });
}