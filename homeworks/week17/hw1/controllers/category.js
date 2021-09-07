/* eslint-disable  consistent-return, no-shadow */
const db = require('../models');

const { Category } = db;

const categoryController = {
  getCategory: (req, res, next) => {
    Category.findAll().then((categories) => {
      req.categories = categories;
      next();
    }).catch((err) => {
      req.flash('errorMessaage', err.toString());
      return res.redirect('back');
    });
  },
  handleAddCategory: (req, res, next) => {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      req.flash('errorMessage', '請填寫標題、文章內容及分類標題');
      return res.redirect('back');
    }

    if (category === 'new') {
      const newCategory = req.body.new_category;
      if (!newCategory) {
        req.flash('errorMessage', '請填寫新分類標題');
        return res.redirect('back');
      }
      Category.create({
        category: newCategory,
      }).then((category) => {
        req.category = category.id;
        next();
      }).catch((err) => {
        req.flash('errorMessage', err.toString());
        return res.redirect('back');
      });
    } else {
      next();
    }
  },
};

module.exports = categoryController;
