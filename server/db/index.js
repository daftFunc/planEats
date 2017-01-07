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

var UsersEvents = db.define('UsersEvents', {
  username: Sequelize.CHAR(10)
});

var MealRecipes = db.define('MealRecipes');
var UsersMeals = db.define('UsersMeals');

// Associations

Recipe.sync();
Users.sync()
  .then(() => {
    Meals.sync()
  })
  .then(() => {
    Meals.belongsToMany(Users, {through: UsersMeals, foreignkey: 'MealsId'});
    Users.belongsToMany(Meals, {through: UsersMeals, foreignkey: 'UsersId'});
    Recipe.belongsToMany(Meals, {through: MealRecipes, foreignkey: 'RecipeId'});
    Meals.belongsToMany(Recipe, {through: MealRecipes, foreignkey: 'MealsId'});
    Events.belongsTo(Meals, {foreignkey: 'MealsId'});
    Meals.hasMany(Events, {foreignkey: 'MealsId'});
    UsersMeals.sync();
    MealRecipes.sync();
    Events.sync()
  })
  .then(() => {
    Events.belongsToMany(Users, {through: UsersEvents, foreignkey: 'EventsId'});
    Users.belongsToMany(Events, {through: UsersEvents, foreignkey: 'UsersId'});
    UsersEvents.sync();
  });

// on delete cascade - when user is deleted it deletes all relations

exports.Recipe = Recipe;
exports.Meals = Meals;
exports.Events = Events;
exports.Users = Users;

