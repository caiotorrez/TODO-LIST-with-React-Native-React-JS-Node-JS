
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password_hash: DataTypes.STRING
    });

    User.prototype.checkPassword = function (password) {
        return bcrypt.compare(password, this.password_hash);
    }

    User.prototype.generateToken = function () {
        return jwt.sign({ id: this.id }, 'secret_key')
    }

    User.prototype.toJSON = function () {
        var values = Object.assign({}, this.get());

        delete values.password_hash;
        return values;
    }

    return User;
}