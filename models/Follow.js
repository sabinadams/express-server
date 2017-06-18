module.exports = (sequelize, DataTypes) => {
    const Follow = sequelize.define("follows", {
        ID: { type: DataTypes.INTEGER, primaryKey: true },
        follower_ID: DataTypes.INTEGER,
        followed_ID: DataTypes.INTEGER,
        timestamp: DataTypes.DATE
    }, {
        timestamps: false
    });

    Follow.associate = (models) => {
        Follow.belongsTo(models.users, { foreignKey: 'follower_ID' });
        Follow.belongsTo(models.users, { foreignKey: 'followed_ID' });
    }
    return Follow;
};