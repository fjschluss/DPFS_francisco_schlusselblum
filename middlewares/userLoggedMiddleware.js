const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

function userLoggedMiddleware(req, res, next) {

    if (req.cookies.userEmail && !req.session.userLogged) {

        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        let userFromCookie = users.find(user => user.email === req.cookies.userEmail);

        if (userFromCookie) {
            req.session.userLogged = userFromCookie;
        }
    }

    next();
}

module.exports = userLoggedMiddleware;