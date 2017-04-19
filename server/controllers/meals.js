var model = require('../models')
module.exports = {
  post: (req, res) => {
    var UserId
    var MealId
    var recipeArr = JSON.parse(req.body.recipe)

    model.findUser(req.body.username)

      .then((user) => {
        UserId = user.dataValues.id
        return model.addMeal(req.body.name, req.body.username + req.body.name)
      })

      .spread((meal, created) => {
        MealId = meal.dataValues.id

        if (!created) {
          throw new Error('Meal name already exists for this user')
        } else {
          return model.addJoinTable('User', 'Meal', UserId, MealId)
        }
      })

      .then((join) => {
        return module.exports.joinRecipesToMeal(recipeArr, recipeArr.length - 1, MealId)
      })

      .then((join) => {
        res.send(201)
        console.log('Meal Created', join)
      })

      .catch((error) => {
        console.log('Meal error', error)
        res.send(304).send(error)
      })
  },

  get: (req, res) => {
    model.getAllJoin('Users', req.headers.username, 'Meals').then((meals) => {
      res.json(meals)
    }).catch((error) => {
      res.json({somethingelse: error})
    })
  },

  getEventMeal: (req, res) => {
    model.getEventMeal(1)

      .then((events) => {
        res.json(events)
      })
  },

  joinRecipesToMeal: (recipeArr, count, MealId) => {
    // debugging
    // console.log("RECIPE ID",recipeArr[count]);

    return model.addJoinTable('Meal', 'Recipe', MealId, recipeArr[count])

      .then((join) => {
        // debugging
        // console.log(join);

        if (count === 0) {
          return join
        } else {
          return module.exports.joinRecipesToMeal(recipeArr, count - 1, MealId)
        }
      })
  }
}
