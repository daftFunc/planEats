var model = require('../models');

//add new controller to array
var fileNames = ['apiKeys', 'event', 'meals', 'recipe','recipesFromEvents','shoppingList', 'user'];

var controllers = {};
fileNames.forEach((fileName) => {
  controllers[fileName] = require('./'+fileName);
})

module.exports = controllers;



//userI = user.dataValues.id;
