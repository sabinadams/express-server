module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        tag: DataTypes.STRING,
        ID: { type: DataTypes.INTEGER, primaryKey: true },
        display_name: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        salt: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        access_level: DataTypes.INTEGER,
        creation_date: DataTypes.DATE,
        timestamp: DataTypes.DATE,
        reset_token: DataTypes.STRING,
        reset_timestamp: DataTypes.DATE,
        description: DataTypes.STRING,
        profile_pic: DataTypes.STRING,
        banner_pic: DataTypes.STRING,
        exp_count: DataTypes.INTEGER,
        level: DataTypes.INTEGER
    }, {
        timestamps: false
    });

    User.associate = (models) => {
        User.hasMany(models.sessions, { foreignKey: 'ID' });
    }

    return User;
};