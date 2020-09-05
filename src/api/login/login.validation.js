exports.authToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (typeof authHeader !== 'undefined') {
        const header = authHeader.split(' ')[1];
        req.token = header;
        next();
    }
    else {
        res.sendStatus(403);
    }
}