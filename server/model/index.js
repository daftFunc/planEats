var controller = require('../controllers');

module.exports = {

  user: {
    post: function(req,res) {
      controller.addUser(req.body.username)
        .spread(function(user, created) {
        res.sendStatus(created ? 201 : 200)
      });
    }
  },
  recipe: {
    post: function(req,res) {
      var UserId;
      var RecipeId;
      controller.findUser(req.body.username)
        .then(function(user){
          UserId = user.dataValues.id;
          return controller.addRecipe(req.body.name, req.body.recipe)
        })
        .then(function(recipe){
          RecipeId = recipe.get('id');
          return controller.addJoinTable('User','Recipe', UserId, RecipeId)
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
    get: function(req,res) {
      controller.getAll(req.headers.username,'Recipe').then(function(recipe) {
        res.json(recipe);
      }).catch(function(error){
        res.json({somethingelse:error});
      });
    }
  },
  meals: {
    post: function(req,res) {
      var UserId;
      var MealId;
      var recipeArr = JSON.parse(req.body.recipe);

      function addMultipleRecipes(counter) {

        controller.findUser(req.body.username)
          .then(function (user) {
            UserId = user.dataValues.id;
            console.log("USERID", UserId);
            return controller.addMeal(req.body.name)
          })
          .then(function (meal) {
            console.log("THIS IS MEAL ID", meal[0].dataValues.id)
            MealId = meal[0].dataValues.id;
            console.log("USER MEAL JOIN", MealId, UserId)
            return controller.addJoinTable('User', 'Meal', UserId, MealId)
          })
          .then(function (joinTable) {
            console.log("MEAL RECIPS JOIN", MealId, recipeArr, counter);
            return controller.addJoinTable('Meal', 'Recipe', MealId, recipeArr[counter].id)
          })
          .then(function (join) {
            //  console.log(join);
            if (counter === recipeArr.length - 1) {
              res.sendStatus(201);
              console.log('Recipe created!', join);
            } else {
              addMultipleRecipes(counter + 1);
            }
          }).catch(function (error) {
          console.error(error);
          console.error('recipe error', error);
          res.sendStatus(404);
        });
      }

      addMultipleRecipes(0);
    },
    get: function(req,res) {
      controller.getAll(req.headers.username,'Meals').then(function(meals) {
        res.json(meals);
      }).catch(function(error) {
        res.json({somethingelse:error});
      });
    },
    getEventMeal: function(req,res) {
      controller.getEventMeal(1)
        .then(function(events) {
          res.json(events);
        });
    }
  },
  events: {
    post: {

    }
  }
}
//userI = user.dataValues.id;