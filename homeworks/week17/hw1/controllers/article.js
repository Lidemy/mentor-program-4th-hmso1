/* eslint-disable prefer-const, prefer-destructuring */
const db = require('../models');

const { Article, Category } = db;

const articleController = {
  index: (req, res) => {
    Article.findAll({
      include: Category,
    }).then((articles) => {
      res.render('index', { articles });
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return res.render('index', {});
    });
  },
  addArticle: (req, res) => {
    const { categories } = req;
    res.render('add_article', { categories });
  },
  handleAddArticle: (req, res) => {
    let { title, content, category } = req.body;
    if (req.category) {
      category = req.category;
    }
    Article.create({
      title,
      content,
      CategoryId: category,
    }).then(() => {
      res.redirect('/');
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return res.redirect('back');
    });
  },
  readMore: (req, res, next) => {
    const { id } = req.params;
    Article.findOne({
      where: {
        id,
      },
      include: Category,
    }).then((article) => {
      res.render('article', { article });
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  },
  edit: (req, res, next) => {
    const { id } = req.params;
    const { categories } = req;
    Article.findOne({
      where: {
        id,
      },
      include: Category,
    }).then((article) => {
      res.render('edit', { article, categories });
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  },
  handleEditArticle: (req, res, next) => {
    let { title, content, category } = req.body;
    if (req.category) {
      category = req.category;
    }
    const { id } = req.params;
    Article.findOne({
      where: { id },
    }).then((article) => {
      article.update({
        title,
        content,
        CategoryId: category,
      });
    }).then(() => {
      res.redirect('/');
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  },
  admin: (req, res, next) => {
    Article.findAll().then((articles) => {
      res.render('admin', { articles });
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  },
  handleDeleteArticle: (req, res, next) => {
    const { id } = req.params;
    Article.findOne({
      where: { id },
    }).then(article => article.destroy())
      .then(() => {
        res.redirect('back');
      }).catch((err) => {
        req.flash('errorMessage', err.toString());
        return next();
      });
  },
};

module.exports = articleController;
