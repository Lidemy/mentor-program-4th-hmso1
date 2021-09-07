/* eslint-disable consistent-return, no-else-return */
const bcrypt = require('bcrypt');
const db = require('../models');

const { User } = db;

const userController = {
  login: (req, res) => {
    res.render('login');
  },
  handleLogin: (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    User.findOne({
      where: { username },
    }).then((user) => {
      if (!user) {
        req.flash('errorMessage', '使用者不存在');
        return next();
      }

      bcrypt.compare(password, user.password, (err, isSuccess) => {
        if (err || !isSuccess) {
          req.flash('errorMessage', '密碼錯誤');
          return next();
        }
        req.session.username = user.username;
        res.redirect('/');
      });
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  },
  isLogin: (req, res, next) => {
    if (req.session.username) {
      return next();
    } else {
      req.flash('errorMessage', '你需要登入');
      return res.redirect('/');
    }
  },
  logout: (req, res) => {
    req.session.username = null;
    res.redirect('/');
  },
};

module.exports = userController;
