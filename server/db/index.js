var Sequelize = require('sequelize');
var db = new Sequelize('planeats', 'postgres', 'sorry1', {
  dialect: 'postgres'
});

// Model definitions
var Recipe = db.define('Recipe', {
  name: {type: Sequelize.STRING, unique: true},
  recipe: Sequelize.JSONB
});

var Meals = db.define('Meals', {
  name: {type: Sequelize.STRING, unique: true},
  favorited: Sequelize.BOOLEAN
});

var Events = db.define('Events', {
  title: Sequelize.STRING,
  start: Sequelize.STRING
});

var Users = db.define('Users', {
  username: {type: Sequelize.STRING, unique: true}
});

// Join Tables
var UsersRecipes = db.define('UsersRecipes');
var UsersEvents = db.define('UsersEvents');
var MealsRecipes = db.define('MealsRecipes');
var UsersMeals = db.define('UsersMeals');

// Associations
//Recipe.sync();
//Users.sync()
//  .then(() => {
//    Users.belongsToMany(Recipe, {through: UsersRecipes, foreignkey: "MealID"});
//    Recipe.belongsToMany(Users, {through: UsersRecipes, foreignkey: "UserId"});
//    UsersRecipes.sync();
//    Meals.sync();
//  })
//  .then(() => {
//    Meals.belongsToMany(Users, {through: UsersMeals, foreignkey: 'MealId'});
//    Users.belongsToMany(Meals, {through: UsersMeals, foreignkey: 'UserId'});
//    Recipe.belongsToMany(Meals, {through: MealsRecipes, foreignkey: 'RecipeId'});
//    Meals.belongsToMany(Recipe, {through: MealsRecipes, foreignkey: 'MealId'});
//    Events.belongsTo(Meals, {foreignkey: 'MealId'});
//    Meals.hasMany(Events, {foreignkey: 'MealId'});
//    UsersMeals.sync();
//    MealsRecipes.sync();
//    Events.sync();
//  })
//  .then(() => {
//    Events.belongsToMany(Users, {through: UsersEvents, foreignkey: 'EventId'});
//    Users.belongsToMany(Events, {through: UsersEvents, foreignkey: 'UserId'});
//    UsersEvents.sync();
//  });
Recipe.sync().then(Users.sync())
.then(()=>Users.belongsToMany(Recipe,{through:UsersRecipes,foreignkey:"MealID"}))
.then(()=>Recipe.belongsToMany(Users,{through:UsersRecipes,foreignkey:"UserId"}))
.then(()=>UsersRecipes.sync())
.then(()=>Meals.sync())
.then(()=>Meals.belongsToMany(Users,{through:UsersMeals,foreignkey:'MealId'}))
.then(()=>Users.belongsToMany(Meals,{through:UsersMeals,foreignkey:'UserId'}))
.then(()=>Recipe.belongsToMany(Meals,{through:MealsRecipes,foreignkey:'RecipeId'}))
.then(()=>Meals.belongsToMany(Recipe,{through:MealsRecipes,foreignkey:'MealId'}))
.then(()=>Events.belongsTo(Meals,{foreignkey:'MealId'}))
.then(()=>Meals.hasMany(Events,{foreignkey:'MealId'}))
.then(()=>UsersMeals.sync())
.then(()=>MealsRecipes.sync())
.then(()=>Events.sync())
.then(()=>Events.belongsToMany(Users,{through:UsersEvents,foreignkey:'EventId'}))
.then(()=>Users.belongsToMany(Events,{through:UsersEvents,foreignkey:'UserId'}))
.then(()=>UsersEvents.sync())
.catch((error)=>{console.log(error)});
// on delete cascade - when user is deleted it deletes all relations

exports.Recipe = Recipe;
exports.Meals = Meals;
exports.Events = Events;
exports.Users = Users;
exports.UsersRecipes = UsersRecipes;
exports.UsersEvents = UsersEvents;
exports.MealsRecipes = MealsRecipes;
exports.UsersMeals = UsersMeals;
