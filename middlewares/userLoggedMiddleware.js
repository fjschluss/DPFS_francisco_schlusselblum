const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

function userLoggedMiddleware(req, res, next) {
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

  res.locals.userLogged = null;

  if (req.session && req.session.userLogged) {
    res.locals.userLogged = req.session.userLogged;
    return next();
  }

  if (req.cookies && req.cookies.userEmail) {
    const userFromCookie = users.find(user => user.email === req.cookies.userEmail);

    if (userFromCookie) {
      req.session.userLogged = userFromCookie;
      res.locals.userLogged = userFromCookie;
    }
  }

  next();
}

module.exports = userLoggedMiddleware;