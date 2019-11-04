
module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
        title: DataTypes.STRING,
        start: DataTypes.DATE,
        end: DataTypes.DATE,
        description: DataTypes.TEXT,
        completed: DataTypes.BOOLEAN,
        release: DataTypes.BOOLEAN
    });

    Task.associate = (models) => {
        Task.belongsTo(models.User);
    }

    return Task;
}