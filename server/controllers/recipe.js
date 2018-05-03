var model = require("../models");
module.exports = {
  post: (req, res) => {
    var UserId;
    var RecipeId;
    console.log("username", req.body.username);
    model
      .findUser(req.body.username)

      .then(user => {
        console.log("user", user);
        UserId = user.dataValues.id;
        var uniqueKey = req.body.username + req.body.name;
        return model.addRecipe(req.body.name, req.body.recipe, uniqueKey);
      })

      .spread((recipe, created) => {
        if (!created) {
          throw new Error("Recipe already exists for this user");
        } else {
          RecipeId = recipe.get("id");
          return model.addJoinTable("User", "Recipe", UserId, RecipeId);
        }
      })

      .then(join => {
        res.sendStatus(201);
        console.log("Recipe created!", join);
      })

      .catch(error => {
        console.error("recipe error", error);
        res.status(404).send(error);
      });
  },
  get: (req, res) => {
    model
      .getAllJoin("Users", req.headers.username, "Recipe")
      .then(recipe => {
        res.json(recipe);
      })

      .catch(error => {
        console.log("Error creating join table", error);
        res.status(304).send(error);
      });
  }
};
