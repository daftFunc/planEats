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
      controller.getAllJoin('Users',req.headers.username,'Recipe').then(function(recipe) {
        res.json(recipe);
      }).catch(function(error){
        res.json({somethingelse:error});
      });
    }
  },
  meals: {
    post: function (req, res) {
      var UserId;
      var MealId;
      var recipeArr = JSON.parse(req.body.recipe);
      console.log("HERE IS ARRAY",recipeArr)
      controller.findUser(req.body.username)
        .then(function (user) {
          UserId = user.dataValues.id;
          return controller.addMeal(req.body.name)
        })
        .then(function (meal) {
          MealId = meal[0].dataValues.id;
          return controller.addJoinTable('User', 'Meal', UserId, MealId)
        })
        .then(function (join) {
          return module.exports.joinRecipesToMeal(recipeArr, recipeArr.length - 1,MealId)
        })
        .then(function (join) {
          res.send(201);
          console.log("Meal Created", join)
        })
        .catch(function (error) {
          console.error(error);
          console.error('Meal error', error);
          res.sendStatus(404);
        });
    },
    get: function (req, res) {
      controller.getAllJoin('Users', req.headers.username, 'Meals').then(function (meals) {
        res.json(meals);
      }).catch(function (error) {
        res.json({somethingelse: error});
      });
    },
    getEventMeal: function (req, res) {
      controller.getEventMeal(1)
        .then(function (events) {
          res.json(events);
        });
    }
  },
  event: {
    post: function (req,res) {
      var UserId;
      var EventId;
      controller.findUser(req.body.username)
        .then(function (user) {
          UserId = user.dataValues.id;
          return controller.addEvent(req.body.title, req.body.start,req.body.meal_id)
        })
        .then(function (events) {
          EventId = events.get('id');
          return controller.addJoinTable('User', 'Event', UserId, EventId);
        })
        .then(function (join) {
          res.sendStatus(201);
          console.log('Event created!', join);
        }).catch(function (error) {
        console.error(error);
        console.error('Event error', error);
        res.sendStatus(404);
      });
    },
    get: function(req,res) {
      console.log("HEADERS",req.headers.username);
      controller.getAllJoin('Users',req.headers.username,'Events').then(function(events) {
        console.log(events);
        res.json(events);
      }).catch(function(error){
        res.json({somethingelse:error});
      });
    }
  },
  getRecipesFromEvents: function(req,res) {
    console.log('object',req.headers.events);
    var parameterObj = module.exports.populate$orObject(req.headers.events,'id','MealId');
    //console.log("MealIds", JSON.stringify(parameterObj));
    controller.getAllHasMany('Meals',parameterObj,'Events')
      .then(function(results){
        return module.exports.getRecipesFromMeals(results, 0);
      })
      .then(function(results){
        console.log("Recipe Sent!", results);
        res.json(results);
      })
      .catch(function(error){
        console.log("Error", error)
        res.send(error);
      })
  },
  getRecipesFromMeals: function(mealsToRecipe, index) {
    return controller.getAllJoin('Meals', mealsToRecipe[index].dataValues.name, 'Recipe')
      .then(function(result){
        mealsToRecipe[index] = result;
        //console.log(result, mealsToRecipe)
        if(index === mealsToRecipe.length-1) {
          return mealsToRecipe;
        } else {
          return module.exports.getRecipesFromMeals(mealsToRecipe, index+1);
        }
      })
      .catch(function(error){
        console.log("ERROR",error);
      });
  },
  joinRecipesToMeal: function (recipeArr, count, MealId) {
    //console.log("RECIPE ID",recipeArr[count]);
    return controller.addJoinTable('Meal', 'Recipe', MealId, recipeArr[count])
      .then(function (join) {
        console.log(join);
        if (count === 0) {
          return join;
        } else {
          return module.exports.joinRecipesToMeal(recipeArr , count - 1, MealId );
        }
      })
  },
  //parameters: 1) array that we turn into '$or' object for query
  //            2) field that we want to check in the database
  //            3) field in the request object that we compare the databse value to
  populate$orObject: function (array,field1,field2) {
    return JSON.parse(array).map(function(element) {
      return {[field1]:{'$eq':element[field2]}};
    });
  }
}
//userI = user.dataValues.id;
