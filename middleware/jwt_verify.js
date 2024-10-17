const jwt = require('jsonwebtoken');

exports.authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.json({
                    status: false,
                    message: "Unauthorized Access !!",
                    title: "Error"
                }) ;
            }
            req.user = user;
            next();
        });
    } else {
        return res.json({
            status: false,
            message: "Token Invalid",
            title: "Error"
        }) ;
    }
};

