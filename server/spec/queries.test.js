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
  var username = 'testUsername';
  var recipeName = ['Hot Chocolate','Sausages'];
  var recipe = [{
                  name:'Hot Chocolate',
                  ingredients:'1) 3 bars of milk chocolate 2) 1 cup of hot water 3) 3 tps of marshmellow'
                },{
                  name:'Jalapeno Sausage',
                  ingredients: '1) 2 Bell-peppers 2) 2 packs of hot-dogs'
                }]
  describe("Users", function() {
    it ( 'should add one user', function (done) {
      controller.addUser(username)
        .spread(function (user, created) {
          if (created) {
            expect(user.username).to.equal(username)
            done();
          } else {
            done(created);
          }
        })
        .catch(function (error) {
          done(error);
        });
    });
    it ( 'should retrieve one user using username', function(done) {
      controller.findUser(username)
        .then(function(user) {
            expect(user.username).to.equal(username);
            done();
        })
        .catch(function(error){
          done(error);
        })
    });
  });
  describe ( "Recipes", function() {
    it ( 'should add recipe', function(done){
      controller.addRecipe(recipeName[0], recipe[0])
        .then(function ( recipeData ) {
          expect(recipeData.name).to.equal(recipeName[0]);
          expect(recipeData.recipe.ingredients).to.equal(recipe[0].ingredients);
          console.log("THIS IS ID",recipeData.id)
          return controller.addJoinTable('User','Recipe', 1, recipeData.id);
        })
        .then(function ( join ) {

          expect(join).to.be.an('object');
          return controller.addRecipe(recipeName[1], recipe[1]);

        })
        .then(function ( recipeData ) {
          expect(recipeData.name).to.equal(recipeName[1]);
          expect(recipeData.recipe.ingredients).to.equal(recipe[1].ingredients);
          return controller.addJoinTable('User','Recipe', 1, recipeData.id);
        })
        .then(function ( join ) {
          expect(join).to.be.an('object');
          done();
        })
        .catch(function(error){
          done(error);
        });

    });
    it ( 'should retrieve all recipes for a user', function(done){
      controller.getAll(username,'Recipe')
        .then(function( recipeData ) {
          expect(recipeData[0].Recipes[0].name).to.equal(recipeName[0]);
          expect(recipeData[0].Recipes[1].name).to.equal(recipeName[1]);
          done();
        })
        .catch(function(error){
          done(error);
        })
    })

  });

  //describe("")
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

