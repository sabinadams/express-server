module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define("sessions", {
        ID: { type: DataTypes.INTEGER, primaryKey: true },
        token: DataTypes.STRING,
        user_ID: DataTypes.INTEGER,
        timestamp: DataTypes.DATE
    }, {
        timestamps: false
    });

    Session.associate = (models) => {
        Session.belongsTo(models.users, { foreignKey: 'user_ID' });
    }

    return Session;
};