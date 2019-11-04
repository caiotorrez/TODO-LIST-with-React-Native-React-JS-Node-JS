
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING
    }, {
        hooks: {
            beforeSave: async (user) => {
                if (user.password) {
                    user.password_hash = await bcrypt.hash(user.password, 8);
                }
            }
        }
    });

    User.associate = function(models) {
        User.hasMany(models.Task);
    }

    User.prototype.checkPassword = function (password) {
        return bcrypt.compare(password, this.password_hash);
    }

    User.prototype.generateToken = function () {
        return jwt.sign({ id: this.id }, 'secret_key', { expiresIn: 100000000 });
    }

    User.prototype.toJSON = function () {
        var values = Object.assign({}, this.get());

        delete values.password_hash;
        return values;
    }

    return User;
}