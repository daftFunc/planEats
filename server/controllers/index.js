var db = require('../db');

modules.exports = {
  recipe: {
    get: function(req, res) {
      db.Recipe.findById()
        .then(function(recipe) {
          res.json(recipe);
        });
    },
    post: function(req, res) {
      db.Meals.findOrCreate({where: {}})
        .spread(function(meal, created) {
          db.Recipe.create({
            mealid: meal.get('id')
          })
        })
    }
  },
  meals: {
    get: function(req, res) {
      db.Meals.findAll({include: [db.Users]})
        .then(function(meals) {
          res.json(meals);
        });
    },
    post: function(req, res) {
      db.User.findOrCreate({where: {username: req.body.username}})
        .spread(function(recipe, created) {
          recipeid: recipe.get('id'),

        })
    }
  },
  events: {
    get: function(req, res) {
      //
    },
    post: function(req, res) {
      //
    }
  },
  users: {
    get: function(req, res) {
      //
    },
    post: function(req, res) {
      //
    }
  }
};