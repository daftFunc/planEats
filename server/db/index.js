var Sequelize = require('sequelize');
var db = new Sequelize('planeats', 'postgres', 'sorry1', {
  dialect: 'postgres'
});

// Model definitions
var ShoppingList = db.define('ShoppingList',{
  list: Sequelize.JSONB
})

var Recipe = db.define('Recipe', {
  uniqueId: Sequelize.STRING,
  name: {type: Sequelize.STRING, unique: true},
  recipe: Sequelize.JSONB
});

var Meals = db.define('Meals', {
  uniqueId: Sequelize.STRING,
  name: {type: Sequelize.STRING, unique: true},
  favorited: Sequelize.BOOLEAN
});

var Events = db.define('Events', {
  uniqueId: Sequelize.STRING,
  title: Sequelize.STRING,
  start: Sequelize.STRING
});

var Users = db.define('Users', {
  username: {type: Sequelize.STRING, unique: true}
});

var Api = db.define('API', {
  site: Sequelize.STRING,
  url: Sequelize.STRING,
  api_key: Sequelize.STRING
});

// Join Tables
var UsersRecipes = db.define('UsersRecipes');
var UsersEvents = db.define('UsersEvents');
var MealsRecipes = db.define('MealsRecipes');
var UsersMeals = db.define('UsersMeals');


//Associations
Api.sync()
.then(()=>Recipe.sync())
.then(()=>Users.sync())
.then(()=>ShoppingList.sync())
.then(()=>ShoppingList.belongsTo(Users,{foreignkey:'UserId'}))
.then(()=>Users.belongsToMany(Recipe, {through: UsersRecipes, foreignkey: "MealID"}))
.then(()=> Recipe.belongsToMany(Users, {through: UsersRecipes, foreignkey: "UserId"}))
.then(()=>UsersRecipes.sync())
.then(()=>Meals.sync())
.then(()=>Meals.belongsToMany(Users, {through: UsersMeals, foreignkey: 'MealId'}))
.then(()=>Users.belongsToMany(Meals, {through: UsersMeals, foreignkey: 'UserId'}))
.then(()=>Recipe.belongsToMany(Meals, {through: MealsRecipes, foreignkey: 'RecipeId'}))
.then(()=>Meals.belongsToMany(Recipe, {through: MealsRecipes, foreignkey: 'MealId'}))
.then(()=>Events.belongsTo(Meals, {foreignkey: 'MealId'}))
.then(()=>Meals.hasMany(Events, {foreignkey: 'MealId'}))
.then(()=>UsersMeals.sync())
.then(()=>MealsRecipes.sync())
.then(()=>Events.sync())
.then(()=>Events.belongsToMany(Users, {through: UsersEvents, foreignkey: 'EventId'}))
.then(()=>Users.belongsToMany(Events, {through: UsersEvents, foreignkey: 'UserId'}))
.then(()=>UsersEvents.sync())
// on delete cascade - when user is deleted it deletes all relations

exports.Recipe = Recipe;
exports.Meals = Meals;
exports.Events = Events;
exports.Users = Users;
exports.UsersRecipes = UsersRecipes;
exports.UsersEvents = UsersEvents;
exports.MealsRecipes = MealsRecipes;
exports.UsersMeals = UsersMeals;
exports.Api = Api;
exports.ShoppingList = ShoppingList;