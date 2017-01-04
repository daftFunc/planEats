var Sequelize = require('sequelize');
var db = new Sequelize('planeats', 'JPMase', 'thesis', {
  dialect: 'postgres'
});

// Model definitions
var Recipe = db.define('Recipe', {
  name: Sequelize.STRING,
  ingredients: Sequelize.ARRAY,
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
Recipe.belongsToMany(Meals);
Meals.hasMany(Recipe);
Events.hasOne(Meals);
Users.hasMany(Events);
Meals.belongsToMany(Users);
Users.hasMany(Meals);

// Sync database
Recipe.sync();
Meals.sync();
Events.sync();
Users.sync();

exports.Recipe = Recipe;
exports.Meals = Meals;
exports.Events = Events;
exports.Users = Users;

