const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = 5001;

const userController = require('./controllers/user');
const prizeController = require('./controllers/prize');

app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitalize: true,
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash('errorMessage');
  next();
});

function redirectBack(req, res) {
  res.redirect('back');
}

app.get('/', prizeController.index);
app.get('/login', userController.login);
app.post('/login', userController.handleLogin, redirectBack);
app.get('/logout', userController.logout);
app.get('/add_prize', userController.isLogin, prizeController.addPrize);
app.post('/add_prize', prizeController.handleAddPrize, redirectBack);
app.get('/admin', userController.isLogin, prizeController.admain, redirectBack);
app.get('/edit/:id', userController.isLogin, prizeController.edit, redirectBack);
app.post('/edit/:id', prizeController.handleEdit, redirectBack);
app.get('/delete/:id', userController.isLogin, prizeController.delete, redirectBack);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
