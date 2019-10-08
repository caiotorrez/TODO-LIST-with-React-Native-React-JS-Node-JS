const { User } = require('../models');
const bcrypt = require('bcrypt');

class UserController {
    async create(req, res) {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(401).json({ message: 'field name ,email or password invalid' });
        }

        if (password !== confirmPassword) {
            return res.status(401).json({ message: 'invalid password' });
        }

        const userDB = await User.findOne({ where: { email } });
        if (userDB) {
            return res.status(409).json({ message: 'E-mail already registered' });
        }

        const saveUserInDB = (err, password_hash) => {
            User.create({ name, email, password_hash }).then(
                (user) => {
                    res.status(201).json(user.id);
                },
                (err) => {
                    console.error(err)
                    return res.status(500).json('Unexpected error');
                }
            );
        }

        bcrypt.hash(password, 8, saveUserInDB);

    }

    async findOneByEmail(req, res) {
        const { email } = req.body;

        if (!email) {
            return res.status(401).json({ message: 'E-mail invalid' });
        }
        const userDB = await User.findOne({ where: { email } });

        if (!userDB) {
            return res.status(401).json({ message: 'User not found' });
        }

        return res.status(200).json(userDB)

    }
}

module.exports = new UserController();