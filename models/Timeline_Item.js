module.exports = (sequelize, DataTypes) => {
    const TimelineItem = sequelize.define("timeline_feed", {
        ID: { type: DataTypes.INTEGER, primaryKey: true },
        user_ID: DataTypes.INTEGER,
        post_ID: DataTypes.INTEGER,
        comment_ID: DataTypes.INTEGER,
        creation_date: DataTypes.DATE,
        timestamp: DataTypes.DATE,
        text: DataTypes.STRING,
        original_user: DataTypes.INTEGER,
        shared: DataTypes.BOOLEAN,
        uuid: DataTypes.STRING
    }, {
        timestamps: false,
        freezeTableName: true
    });

    TimelineItem.associate = (models) => {
        TimelineItem.belongsTo(models.users, {
            foreignKey: 'user_ID',
            as: 'user'
        });
        TimelineItem.hasMany(models.timeline_feed, {
            foreignKey: 'post_ID',
            as: 'comments'
        });
        TimelineItem.hasMany(models.timeline_feed, {
            foreignKey: 'comment_ID',
            as: 'replies'
        });
        TimelineItem.hasMany(models.timeline_likes, {
            foreignKey: 'item_ID',
            as: 'likes'
        });
    }
    return TimelineItem;
};