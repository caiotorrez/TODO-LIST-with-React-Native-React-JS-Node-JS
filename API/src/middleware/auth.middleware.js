const jwt = require('jsonwebtoken');
const { promisify } = require('util');


module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token is not present' })
    }

    const [, token] = authHeader.split(' ');
    try {
        const decoded = await promisify(jwt.verify)(token, 'secret_key');
        req.uid = decoded.id;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Token is invalid' })
    }
}