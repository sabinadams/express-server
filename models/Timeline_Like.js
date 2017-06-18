module.exports = (sequelize, DataTypes) => {
    const TimelineLike = sequelize.define("timeline_likes", {
        ID: { type: DataTypes.INTEGER, primaryKey: true },
        user_ID: DataTypes.INTEGER,
        item_ID: DataTypes.INTEGER
    }, {
        timestamps: false
    });


    TimelineLike.associate = (models) => {
        TimelineLike.belongsTo(models.timeline_feed, { foreignKey: 'item_ID' });
        TimelineLike.belongsTo(models.users, { foreignKey: 'user_ID' });
    }

    return TimelineLike;
};