// Imports
const jwt = require('jsonwebtoken')
require('dotenv').config();

const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET_SECRET

// Export functions
module.exports = {
    generateTokenForUser: (userData) => {
        return jwt.sign({
            userId: userData.id
        },
        JWT_SIGN_SECRET, 
        {
            //expiresIn: '1h'
        })
    },
    parseAuthorization: (authorization) => {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: (authorization) => {
        let userId = -1;
        let token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null) {
                    userId = jwtToken.userId;
                }
            } catch(err) {}
        }
        return userId;
    }
}