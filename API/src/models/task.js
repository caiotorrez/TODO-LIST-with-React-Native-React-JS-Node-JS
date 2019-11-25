
module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
        title: DataTypes.STRING,
        completed: DataTypes.BOOLEAN,
        active: DataTypes.BOOLEAN,
        start: DataTypes.DATE,
        end: DataTypes.DATE,
        description: DataTypes.TEXT,
        release: DataTypes.BOOLEAN
    });

    Task.associate = (models) => {
        Task.belongsTo(models.User);
    }

    return Task;
}