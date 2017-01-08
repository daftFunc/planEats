var db = require('../db');

module.exports = {
  AddUser: function(req, res) {
    db.Users.findOrCreate({where: {username: req.body.username}})
      .spread(function(user, created) {
        res.sendStatus(created ? 201 : 200)
      });
  },
  GetRecipes: function(req, res) {
    db.Recipe.findAll({include:[db.Users]})
      .then(function(recipe) {
        res.json(recipe);
      }).catch(function(error){
      res.json({somethingelse:error});
    });
  },
  AddRecipe: function(req, res) {
    var userI;

    console.log('hihih',req.body.data);
    db.Users.findOne({where: {username: req.body.username}})
      .then(function(user) {
        userI = user.dataValues.id;
        return db.Recipe.create({
          name: req.body.name,
          recipe: req.body.data
        });

        })
        .then(function(meal) {
          console.log('string',meal);
          return db.UsersRecipes.create({
            UserId: userI,
            RecipeId: meal.get('id')
          })
        })
        .then(function(join){
          res.sendStatus(201);
          console.log('Recipe created!', join);
        }).catch(function(error){
          console.error(error);
          console.error('recipe error',error);
          res.sendStatus(404);
        });

  },
  GetMeals: function(req, res, data, field) {
    db.Meals.findAll({include: [db.Users]})
      .then(function(meals) {
        res.json(meals);
      });
  },
  AddMeal: function(req, res) {
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
  },
  GetEvents: function(req, res) {
    db.Events.findAll({include: [db.Users]})
      .then(function(events) {
        res.json(events);
      });
  },
  AddEvent: function(req, res) {
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
};

//
//
// meal = {
//   name: 'steak and eggs',
//   user: userId,
//   favorited: boolean,
//   recipesIds: [1, 2, 3, 4, 5]
// }