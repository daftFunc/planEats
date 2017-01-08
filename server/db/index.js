var Sequelize = require('sequelize');
var db = new Sequelize('planeats', 'postgres', 'sorry1', {
  dialect: 'postgres'
});

// Model definitions
var Recipe = db.define('Recipe', {
  name: Sequelize.STRING,
  recipe: Sequelize.JSONB
});

var Meals = db.define('Meals', {
  name: Sequelize.STRING,
  favorited: Sequelize.BOOLEAN
});

var Events = db.define('Events', {
  name: Sequelize.STRING,
  meal_time: Sequelize.TIME
});

var Users = db.define('Users', {
  username: Sequelize.CHAR(10)
});

// Join Tables
var UsersRecipes = db.define('UsersRecipes');
var UsersEvents = db.define('UsersEvents');
var MealsRecipes = db.define('MealsRecipes');
var UsersMeals = db.define('UsersMeals');

// Associations

Recipe.sync();
Users.sync()
  .then(() => {
    Users.belongsToMany(Recipe, {through: UsersRecipes, foreignkey: "MealID"});
    Recipe.belongsToMany(Users, {through: UsersRecipes, foreignkey: "UserId"});
    UsersRecipes.sync();
    Meals.sync();
  })
  .then(() => {
    Meals.belongsToMany(Users, {through: UsersMeals, foreignkey: 'MealId'});
    Users.belongsToMany(Meals, {through: UsersMeals, foreignkey: 'UserId'});
    Recipe.belongsToMany(Meals, {through: MealsRecipes, foreignkey: 'RecipeId'});
    Meals.belongsToMany(Recipe, {through: MealsRecipes, foreignkey: 'MealId'});
    Events.belongsTo(Meals, {foreignkey: 'MealId'});
    Meals.hasMany(Events, {foreignkey: 'MealId'});
    UsersMeals.sync();
    MealsRecipes.sync();
    Events.sync();
  })
  .then(() => {
    Events.belongsToMany(Users, {through: UsersEvents, foreignkey: 'EventId'});
    Users.belongsToMany(Events, {through: UsersEvents, foreignkey: 'UserId'});
    UsersEvents.sync();
  });

// on delete cascade - when user is deleted it deletes all relations

exports.Recipe = Recipe;
exports.Meals = Meals;
exports.Events = Events;
exports.Users = Users;
exports.UsersRecipes = UsersRecipes;
exports.UsersEvents = UsersEvents;
exports.MealsRecipes = MealsRecipes;
exports.UsersMeals = UsersMeals;