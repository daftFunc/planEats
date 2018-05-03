var database = require("../DatabaseName");
var db = require(database.pathName);

var columns = {
  Recipe: {
    col1: "name",
    col2: "recipe"
  },
  Meals: {
    col1: "name",
    col2: "favorited"
  },
  Events: {
    col1: "title",
    col2: "start"
  },
  Users: {
    col1: "username"
  }
};

module.exports = {
  findUser: username => {
    return db.Users.findOne({ where: { username: username } });
  },

  addUser: user => {
    return db.Users.findOrCreate({ where: { username: user } });
  },

  getShoppingList: UserId => {
    //debugging
    //console.log('get shopping list user', UserId);
    return db.ShoppingList.findOrCreate({
      where: { UserId: UserId },
      defaults: { list: {} }
    });
  },

  updateShoppingList: (newList, UserId) => {
    //debugging
    //console.log("newList",newList);
    return db.ShoppingList.update(
      { list: newList },
      { where: { UserId: UserId } }
    );
  },

  getAllJoin: (reference, refData, type) => {
    //debugging
    //console.log(type);
    var col1 = columns[type].col1;
    var col2 = columns[type].col2;
    var refField = columns[reference].col1;

    parameters = {
      where: { [refField]: refData },
      include: [
        {
          model: db[type],
          through: {
            attributes: [col1, col2]
          }
        }
      ]
    };
    //debugging
    //console.log(parameters);
    return db[reference].findAll(parameters);
  },

  getAllHasMany: (reference, refData) => {
    //debugging
    //console.log(refData);
    return db[reference].findAll({ where: { $or: refData } });
  },

  addRecipe: (name, recipe, uniqueKey) => {
    return db.Recipe.findOrCreate({
      where: { uniqueId: uniqueKey },
      defaults: {
        name: name,
        recipe: recipe
      }
    });
  },

  addMeal: (name, uniqueKey) => {
    return db.Meals.findOrCreate({
      where: { uniqueId: uniqueKey },
      defaults: {
        name: name,
        favorited: false
      }
    });
  },

  getEventMeal: id => {
    return db.Meals.findAll({ where: { id: id } });
  },

  addEvent: (name, meal_time, meal_id, uniqueKey) => {
    return db.Events.findOrCreate({
      where: { uniqueId: uniqueKey },
      defaults: {
        title: name,
        start: meal_time,
        MealId: meal_id
      }
    });
  },

  editEvent: (name, meal_time, uniqueKey) => {
    return db.Events.update(
      { title: name, start: meal_time },
      { where: { id: uniqueKey } }
    );
  },

  removeEvent: uniqueKey => {
    return db.Events.destroy({ where: { id: uniqueKey } });
  },

  addJoinTable(Join1, Join2, id1, id2) {
    return db[Join1 + "s" + Join2 + "s"].create({
      [Join1 + "Id"]: id1,
      [Join2 + "Id"]: id2
    });
  },

  postKey: (site, url, key) => {
    return db.Api.create({
      site: site,
      url: url,
      api_key: key
    });
  },

  getKey: reqSite => {
    return db.Api.find({ where: { site: reqSite } });
  }
};
