var Sequelize = require('sequelize')
var db = new Sequelize('planeats', 'postgres', 'thesisEats', {
  dialect: 'postgres',
  host: process.env.DBHOST
})

// Model definitions
var Recipe = db.define('Recipe', {
  uniqueId: Sequelize.STRING,
  name: Sequelize.STRING,
  recipe: Sequelize.JSONB
})

var Meals = db.define('Meals', {
  uniqueId: Sequelize.STRING,
  name: Sequelize.STRING,
  favorited: Sequelize.BOOLEAN
})

var Events = db.define('Events', {
  uniqueId: Sequelize.STRING,
  title: Sequelize.STRING,
  start: Sequelize.TIME
})

var Users = db.define('Users', {
  username: {type: Sequelize.STRING, unique: true}
})

// Join Tables
var UsersRecipes = db.define('UsersRecipes')
var UsersEvents = db.define('UsersEvents')
var MealsRecipes = db.define('MealsRecipes')
var UsersMeals = db.define('UsersMeals')

// Associations

// on delete cascade - when user is deleted it deletes all relations

exports.Recipe = Recipe
exports.Meals = Meals
exports.Events = Events
exports.Users = Users
exports.UsersRecipes = UsersRecipes
exports.UsersEvents = UsersEvents
exports.MealsRecipes = MealsRecipes
exports.UsersMeals = UsersMeals
