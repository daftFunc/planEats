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
      var RecipeId;
      var username = req.body.username;
      var recipe = req.body.recipe;
      var id = req.body.recipe.id;
      controller.findUser(req.body.username)
        .then(function(user) {
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
    }
  }
}
//userI = user.dataValues.id;