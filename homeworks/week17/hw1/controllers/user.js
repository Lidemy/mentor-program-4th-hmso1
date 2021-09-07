/* eslint-disable  consistent-return */
const brcypt = require('bcrypt');
const db = require('../models');

const { User } = db;

const userController = {
  login: (req, res) => {
    res.render('login');
  },
  handleLogin: (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash('errorMessage', '請填寫 USERNAME 和 PASSWORD');
      next();
    }

    User.findOne({
      where: {
        username,
      },
    }).then((user) => {
      if (!user) {
        req.flash('errorMessage', 'USERNAME 不正確');
        return next();
      }

      brcypt.compare(password, user.password, (err, isSuccess) => {
        if (err || !isSuccess) {
          req.flash('errorMessage', 'PASSWORD 不正確');
          return next();
        }

        req.session.username = username;
        res.redirect('/');
      });
    });
  },
  logout: (req, res) => {
    req.session.username = null;
    res.redirect('/');
  },
  isLogin: (req, res, next) => {
    if (req.session.username) {
      next();
    } else {
      req.flash('errorMessage', '你需要登入');
      res.redirect('/');
    }
  },
};

module.exports = userController;
