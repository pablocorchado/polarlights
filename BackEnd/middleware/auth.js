const admin = require('../config/firebaseAdmin');

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).send('No autorizado');
    }
};

module.exports = authenticate;
