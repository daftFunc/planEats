var model = require('../models');

module.exports = {
  getMealsFromEvents: (req,res) => {
    //debugging
    //console.log('object',req.headers.events);
    var parameterObj = module.exports.populate$orObject(req.headers.events,'id','MealId');

    //debugging
    //console.log("MealIds", JSON.stringify(parameterObj));

    model.getAllHasMany('Meals',parameterObj)

      .then((results) => {
        return module.exports.getRecipesFromMeals(results, 0);
      })

      .then((results) => {
        console.log("Recipe Sent!", results);
        res.json(results);
      })

      .catch((error) => {
        console.log("Error", error)
        res.send(error);
      })
  },
  getRecipesFromMeals: (mealsToRecipe, index) => {

    return model.getAllJoin('Meals', mealsToRecipe[index].dataValues.name, 'Recipe')

      .then((result) => {
        mealsToRecipe[index] = result;
        //debugging
        //console.log(result, mealsToRecipe)

        if (index === mealsToRecipe.length - 1) {
          return mealsToRecipe;

        } else {
          return module.exports.getRecipesFromMeals(mealsToRecipe, index + 1);
        }
      })

      .catch((error) => {
        console.log('Error getting recipes from meals', error);
      });
  },
  //parameters: 1) array that we turn into '$or' object for query
  //            2) field that we want to check in the database
  //            3) field in the request object that we compare the database value to
  populate$orObject: (array, field1, field2) => {

    return JSON.parse(array).map((element) => {
      return {[field1]:{'$eq':element[field2]}};
    });
  }
}