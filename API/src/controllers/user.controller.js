const { User } = require('../models');

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

        await User.create({ name, email, password }).then(
            (user) => {
                res.status(201).json(user.id);
            },
            (err) => {
                console.error(err)
                return res.status(500).json('Unexpected error');
            }
        );
    }

    async findOneByEmail(req, res) {
        const { email } = req.params;

        if (!email) {
            return res.status(401).json({ message: 'E-mail invalid' });
        }
        const userDB = await User.findOne({ where: { email } });

        if (!userDB) {
            return res.status(401).json({ message: 'User not found' });
        }

        return res.status(200).json(userDB)
    }

    async findAll(req, res) {
        const defaultQuerys = { limit: 10, offset: 0, group: 'name', order: 'DESC' };
        const pageable = { limit: Number(req.query.limit) || defaultQuerys.limit, offset: Number(req.query.offset) || defaultQuerys.offset }
        const queryOrder = { order: [[req.query.group || defaultQuerys.group, req.query.order || defaultQuerys.order]] }
        const validQuerys = Object.assign(pageable, queryOrder);

        const allUsersDB = await User.findAll(validQuerys);

        return res.status(200).json(allUsersDB)
    }
}

module.exports = new UserController();