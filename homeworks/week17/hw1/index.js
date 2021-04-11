/* eslint-disable  no-path-concat, prefer-template */
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = 5001;

app.use(express.static(__dirname + '/'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash('errorMessage');
  next();
});

const userController = require('./controllers/user');
const articleController = require('./controllers/article');
const categoryController = require('./controllers/category');

app.set('view engine', 'ejs');

function redirectBack(req, res) {
  res.redirect('back');
}

app.get('/', articleController.index);
app.get('/login', userController.login);
app.post('/login', userController.handleLogin, redirectBack);
app.get('/logout', userController.logout);
app.get('/add_article', userController.isLogin, categoryController.getCategory, articleController.addArticle);
app.post('/add_article', categoryController.handleAddCategory, articleController.handleAddArticle);
app.get('/article/:id', articleController.readMore, redirectBack);
app.get('/edit/:id', userController.isLogin, categoryController.getCategory, articleController.edit, redirectBack);
app.post('/edit/:id', userController.isLogin, categoryController.handleAddCategory, articleController.handleEditArticle, redirectBack);
app.get('/admin', userController.isLogin, articleController.admin, redirectBack);
app.get('/delete/:id', userController.isLogin, articleController.handleDeleteArticle, redirectBack);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
