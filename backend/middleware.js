const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

function authMiddleware(req, res, next) {
    const bearerToken = req.header('Authorization')
    const token = bearerToken.split(' ')[1]
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.userId = decodedToken.userId;
    } catch (err) {
        return res.status(403).json(
            { msg: "Invalid token" }
        );
    }

    next()
}

module.exports = authMiddleware