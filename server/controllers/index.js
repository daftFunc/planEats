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
  getShoppingList: function(UserId) {
    console.log('get shopping list user', UserId);
    return db.ShoppingList.findOrCreate({where:{UserId:UserId}, defaults:{list: {}}})
  },
  updateShoppingList: function(newList, UserId) {
    console.log("newList",newList);
    return db.ShoppingList.update({list:newList}, {where:{UserId:UserId}})
  },
  getAllJoin: function(reference, refData,type) {
    //console.log(type);
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
    //console.log(parameters);
    return db[reference].findAll(parameters);
  },

  getAllHasMany: function(reference, refData) {
    //console.log(refData);
    return db[reference].findAll({where:{$or:refData}});
  },

  addRecipe: function(name,recipe, uniqueKey) {

    return db.Recipe.findOrCreate({where:{uniqueId:uniqueKey}, defaults:{
      name: name,
      recipe: recipe
    }});
  },

  addMeal: function(name, uniqueKey) {
    return db.Meals.findOrCreate({where:{uniqueId:uniqueKey}, defaults:{
      name: name,
      favorited: false
    }});
  },

  getEventMeal: function(id) {
    return db.Meals.findAll({where:{id:id}});
  },

  addEvent: function(name, meal_time, meal_id, uniqueKey) {
    return db.Events.findOrCreate({where:{uniqueId:uniqueKey}, defaults:{
      title: name,
      start: meal_time,
      MealId: meal_id
    }})
  },

  editEvent: function(name, meal_time, meal_id, uniqueKey) {
    return db.Events.update({title: name, start: meal_time, MealId: meal_id}, {where: {id: uniqueKey}})
  },

  removeEvent: function(uniqueKey) {
    return db.Events.destroy({where: {id: uniqueKey}})
  },

  addJoinTable(Join1, Join2, id1, id2) {
    return db[Join1+'s'+Join2+'s'].create({
      [Join1+'Id']: id1,
      [Join2+'Id']: id2
    })
  },

  postKey: function(site, url, key) {
    return db.Api.create({
      site: site,
      url: url,
      api_key: key
    });
  },

  getKey: function(reqSite) {
    return db.Api.find({where: {site: reqSite}});
  }
};
