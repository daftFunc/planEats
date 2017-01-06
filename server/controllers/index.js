var db = require('../db');

module.exports = {
  recipe: {
    get: function(req, res) {
      db.Recipe.findAll({include: [db.Meal]})
        .then(function(recipe) {
          res.json(recipe);
        });
    },
    post: function(req, res) { 
      db.Meals.findOrCreate({where: {name: req.body.name}}) 
        .spread(function(meal, created) {
          db.Recipe.create({
            mealid: meal.get('id'), 
            name: req.body.name,
            ingredients: req.body.ingredients,
            time: req.body.time,
            servings: req.body.servings,
            directions: req.body.directions,
            nutrition: req.body.nutrition 
          }).then(function(recipe) {
            res.sendStatus(201);
            console.log('Recipe created!');
          }); 
        });
    }
  },
  meals: {
    get: function(req, res, data, field) {
      db.Meals.findAll({include: [db.Users]})
        .then(function(meals) {
          res.json(meals);
        });
    },
    post: function(req, res) {
      db.User.findOrCreate({where: {username: req.body.username}})
        .spread(function(user, created) {
          db.Meals.create({
          userid: user.get('id'),
          name: req.body.name,
          favorited: req.body.favorited
          }).then(function(meal) {
            res.sendStatus(201);
            console.log('Meal created!');
          });
        });
    }
  },
  events: {
    get: function(req, res) {
      db.Events.findAll({include: [db.Users]})
        .then(function(events) {
          res.json(events);
        });
    },
    post: function(req, res) {
      db.User.findOrCreate({where: {username: req.body.username}})
        .spread(function(user, created) {
          db.Events.create({
            userid: user.get('id'),
            meal_time: req.body.meal_time
          }).then(function(event) {
            res.sendStatus(201);
            console.log('Event created!');
          })
        })
    }
  },
  users: {
    get: function(req, res) {
      db.Users.findAll()
        .then(function(users) {
          res.json(users);
        })
    },
    post: function(req, res) {
      db.Users.findOrCreate({where: {username: req.body.username}})
         .spread(function(user, created) {
            res.sendStatus(created ? 201 : 200)
         });
    }
  }
};