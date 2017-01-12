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
    col1: 'title',
    col2: 'start'
  },
  Users:{
    col1:'username'
  }
}

module.exports = {

  findUser: function(username) {
    return db.Users.findOne({where: {username:username}});
  },

  addUser: function(user) {
    return db.Users.findOrCreate({where: {username:user}});
  },

  getAll: function(reference, refData,type) {
    console.log(type);
    var parameters;
    if(Array.isArray(refData)) {
      parameters = {where:{$or:refData}};
    } else {
      var col1     = columns[type].col1;
      var col2     = columns[type].col2;
      var refField = columns[reference].col1;

      parameters = {
        where: {[refField]: refData},
        include: [{
          model: db[type],
          through: {
            attributes: [col1, col2]
          }
        }]
      };
    }
    console.log(parameters);
    return db[reference].findAll(parameters);
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
      title: name,
      start: meal_time,
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