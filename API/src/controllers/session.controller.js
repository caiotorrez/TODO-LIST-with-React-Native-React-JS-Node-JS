const { User } = require('../models');

class SessionController {
    async authenticate(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: 'User or password invalid' });
        }

        const dbUser = await User.findOne({ where: { email } }).catch((err) => {
            console.error('Error: User not found in database!');
        });

        if (!dbUser) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (!(await dbUser.checkPassword(password))) {
            return res.status(401).json({ message: 'Incorect password' });
        }

        return res.json({ token: dbUser.generateToken() });

    }
}

module.exports = new SessionController();