/* eslint-disable  no-plusplus, consistent-return, no-trailing-spaces, comma-dangle */
const db = require('../models');

const { Prize } = db;

function drawResult(obj) {
  let totalWeight = 0;
  for (let i = 0; i < obj.length; i++) {
    totalWeight += obj[i].weight;
  }
  const randomNumber = Math.floor(Math.random() * totalWeight);
  let sumWeight = 0;
  for (let i = 0; i < obj.length; i++) {
    sumWeight += obj[i].weight;
    if (randomNumber < sumWeight) {
      return i;
    }
  }
}

function checkInput(prize, url, weight) {
  if (!prize || !url || !weight) {
    return [false, '缺少必要欄位'];
  }
  if (weight <= 0) {
    return [false, '權重一定要大過 0'];
  }
  return [true, null];
}

const prizeController = {
  index: (req, res) => {
    Prize.findAll().then((prizes) => {
      if (prizes.length === 0) {
        const result = {};
        return res.render('index', { result });
      }
      const index = drawResult(prizes);
      const result = prizes[index];
      res.render('index', { result });
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return res.render('index', {});
    });
  },
  admain: (req, res, next) => {
    Prize.findAll().then((prizes) => {
      res.render('admin', { prizes });
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  },
  addPrize: (req, res) => {
    res.render('add_prize');
  },
  handleAddPrize: (req, res, next) => {
    const { prize, url, weight } = req.body;
    const [isValid, error] = checkInput(prize, url, weight);
    if (!isValid) {
      req.flash('errorMessage', error);
      return next();
    }

    Prize.create({
      name: prize,
      url,
      weight,
    }).then(() => {
      res.redirect('/admin');
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      next();
    });
  },
  edit: (req, res, next) => {
    const { id } = req.params;
    Prize.findOne({
      where: { id },
    }).then(prize => res.render('edit', { prize }))
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        next();
      });
  },
  handleEdit: (req, res, next) => {
    const { id } = req.params;
    const { prize, url, weight } = req.body;
    const [isValid, error] = checkInput(prize, url, weight);
    if (!isValid) {
      req.flash('errorMessage', error);
      return next();
    }

    Prize.findOne({
      where: { id },
    }).then(prizes => prizes.update({ 
      name: prize,
      url,
      weight,
    }))
      .then(() => res.redirect('/admin'))
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        next();
      });
  },
  delete: (req, res, next) => {
    const { id } = req.params;
    Prize.findOne({
      where: { id },
    }).then(prize => prize.destroy())
      .then(() => {
        res.redirect('/admin');
      }).catch((err) => {
        req.flash('errorMessage', err.toString());
        next();
      });
  },
};

module.exports = prizeController;
