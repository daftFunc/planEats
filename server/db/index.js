var Sequelize = require('sequelize');
var db = new Sequelize('planeats', 'postgres', 'thesisEats', {
  dialect: 'postgres'
});

// Model definitions
var Recipe = db.define('Recipe', {
  name: Sequelize.STRING,
  ingredients: Sequelize.STRING,
  time: Sequelize.INTEGER,
  servings: Sequelize.INTEGER,
  directions: Sequelize.TEXT,
  nutrition: Sequelize.INTEGER
});

var Meals = db.define('Meals', {
  name: Sequelize.STRING,
  favorited: Sequelize.BOOLEAN
});

var Events = db.define('Events', {
  meal_time: Sequelize.TIME
});

var Users = db.define('Users', {
  username: Sequelize.CHAR(10)
});

// Associations
Recipe.belongsToMany(Meals, {through: 'MealRecipe'});
Meals.belongsToMany(Recipe, {through: 'MealRecipe'});
// Meals.hasMany(Recipe);
Meals.hasMany(Events, {as: 'Meal'});
Users.hasMany(Events, {as: 'Event'});
Meals.belongsToMany(Users, {through: 'UsersMeals'});
Users.belongsToMany(Meals, {through: 'UsersMeals'});
// Users.hasMany(Meals);

// Sync database
Recipe.sync();
Meals.sync();
Events.sync();
Users.sync();

exports.Recipe = Recipe;
exports.Meals = Meals;
exports.Events = Events;
exports.Users = Users;

