var database = require('../DatabaseName');
var db = require(database.pathName);

var columns = {
  Recipe: {
    col1: 'name',
    col2: 'recipe'
  },
  Meals: {
    col1: 'name',
    col2: 'favorited'
  },
  Events:{
    col1: 'name',
    col2: 'meal_time'
  }
}

module.exports = {

  findUser: function(username) {
    return db.Users.findOne({where: {username:username}});
  },

  addUser: function(user) {
    return db.Users.findOrCreate({where: {username:user}});
  },

  getAll: function(username,type) {
    var col1 = columns[type].col1;
    var col2 = columns[type].col2;
    return db.Users.findAll({where:{username:username},
      include: [{
        model: db[type],
        through: {
          attributes: [col1,col2]
        }
      }]
    });
  },

  addRecipe: function(name,recipe) {
    return db.Recipe.create({
      name: name,
      recipe: recipe
    });
  },

  addMeal: function(name) {
    return db.Meals.findOrCreate({where:{name:name}, defaults:{
      name: name,
      favorited: false
    }});
  },

  getEventMeal: function(id) {
    return db.Meals.findAll({where:{id:id}});
  },

  addEvent: function(name, meal_time, meal_id) {
    return db.Events.create({
      name: name,
      meal_time: meal_time,
      MealId: meal_id
    })
  },

  addJoinTable(Join1, Join2, id1, id2) {
    return db[Join1+'s'+Join2+'s'].create({
      [Join1+'Id']: id1,
      [Join2+'Id']: id2
    })
  }
};
