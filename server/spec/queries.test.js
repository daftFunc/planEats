var database = require('../DatabaseName');
var db = require('./database');
database.pathName = '../spec/database';
var controller = require('../controllers/index')
var expect = require('chai').expect;

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
describe('Database Queries', function()  {
  before(function(done){
    db.Recipe.sync({force:true}).then(db.Users.sync({force:true}))
      .then(()=>db.Users.belongsToMany(db.Recipe, {through: db.UsersRecipes, foreignkey: "MealID"}))
      .then(()=> db.Recipe.belongsToMany(db.Users, {through: db.UsersRecipes, foreignkey: "UserId"}))
      .then(()=>db.UsersRecipes.sync({force:true}))
      .then(()=>db.Meals.sync({force:true}))
      .then(()=>db.Meals.belongsToMany(db.Users, {through: db.UsersMeals, foreignkey: 'MealId'}))
      .then(()=>db.Users.belongsToMany(db.Meals, {through: db.UsersMeals, foreignkey: 'UserId'}))
      .then(()=>db.Recipe.belongsToMany(db.Meals, {through: db.MealsRecipes, foreignkey: 'RecipeId'}))
      .then(()=>db.Meals.belongsToMany(db.Recipe, {through: db.MealsRecipes, foreignkey: 'MealId'}))
      .then(()=>db.Events.belongsTo(db.Meals, {foreignkey: 'MealId'}))
      .then(()=>db.Meals.hasMany(db.Events, {foreignkey: 'MealId'}))
      .then(()=>db.UsersMeals.sync({force:true}))
      .then(()=>db.MealsRecipes.sync({force:true}))
      .then(()=>db.Events.sync({force:true}))
      .then(()=>db.Events.belongsToMany(db.Users, {through: db.UsersEvents, foreignkey: 'EventId'}))
      .then(()=>db.Users.belongsToMany(db.Events, {through: db.UsersEvents, foreignkey: 'UserId'}))
      .then(()=>db.UsersEvents.sync({force:true}))
      .then(()=>{done()});
   //db.Recipe.sync({force:true});
   //db.Users.sync({force:true})
   //   .then(() => {
   //    db.Users.belongsToMany(db.Recipe, {through: db.UsersRecipes, foreignkey: "MealID"});
   //    db.Recipe.belongsToMany(db.Users, {through: db.UsersRecipes, foreignkey: "UserId"});
   //    db.UsersRecipes.sync({force:true});
   //    db.Meals.sync({force:true});
   //   })
   //   .then(() => {
   //    db.Meals.belongsToMany(db.Users, {through: db.UsersMeals, foreignkey: 'MealId'});
   //    db.Users.belongsToMany(db.Meals, {through: db.UsersMeals, foreignkey: 'UserId'});
   //    db.Recipe.belongsToMany(db.Meals, {through: db.MealsRecipes, foreignkey: 'RecipeId'});
   //    db.Meals.belongsToMany(db.Recipe, {through: db.MealsRecipes, foreignkey: 'MealId'});
   //    db.Events.belongsTo(db.Meals, {foreignkey: 'MealId'});
   //    db.Meals.hasMany(db.Events, {foreignkey: 'MealId'});
   //    db.UsersMeals.sync({force:true});
   //    db.MealsRecipes.sync({force:true});
   //    db.Events.sync({force:true});
   //   })
   //   .then(() => {
   //     db.Events.belongsToMany(db.Users, {through: db.UsersEvents, foreignkey: 'EventId'});
   //    db.Users.belongsToMany(db.Events, {through: db.UsersEvents, foreignkey: 'UserId'});
   //    db.UsersEvents.sync({force:true});
      });
  describe("Users", function() {
    it('should add one user', function (done) {
      controller.addUser('hahahoho')
        .spread(function (user, created) {
          if (created) {
            console.log('this is user',user)
            expect(user.username).to.equal("hahahoho")
            done();
          } else {
            done(created);
          }
        })
        .catch(function (error) {
          done(error);
        });
    });
  });
  //  if('should retrieve that user')
  //  return db.Users.findOne({where: {username: username}})
  //
  //
  //})
  });
  //var col1 = columns[type].col1;
  //var col2 = columns[type].col2;
  //return db.Users.findAll({where:{username:username},
  //  include: [{
  //    model: db[type],
  //    through: {
  //      attributes: [col1,col2]
  //    }
  //  }]
  //});
  //
  //
  //return db.Recipe.create({
  //  name: name,
  //  recipe: recipe
  //});
  //
  //
  //return db.Meals.findOrCreate({where:{name:name}, defaults:{
  //  name: name,
  //  favorited: false
  //}});
  //
  //
  //return db.Meals.findAll({where:{id:id}});
  //
  //
  //return db.Events.create({
  //  name: name,
  //  meal_time: meal_time,
  //  meal_id: meal_id
  //})
  //
  //
  //
  //return db[Join1+'s'+Join2+'s'].create({
  //  [Join1+'Id']: id1,
  //  [Join2+'Id']: id2
  //})

