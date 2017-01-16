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
  describe("Users", () => {
    it ( 'should add one user', (done)=>{
      controller.addUser(username)
        .spread((user, created) => {
          if (created) {
            expect(user.username).to.equal(username)
            done();
          } else {
            done(created);
          }
        })
        .catch((error) => {
          done(error);
        });
    });
    it ( 'should retrieve one user using username', (done) => {
      controller.findUser(username)
        .then((user) => {
            expect(user.username).to.equal(username);
            done();
        })
        .catch((error) => {
          done(error);
        })
    });
  });
  describe ( "Recipes", () => {
    it ( 'should add recipe', (done)=> {
      controller.addRecipe(recipeName[0], recipe[0])
        .spread(( recipeData, created ) => {
          if(created){
            console.error("already exists");
          }
          expect(recipeData.name).to.equal(recipeName[0]);
          expect(recipeData.recipe.ingredients).to.equal(recipe[0].ingredients);
          console.log("THIS IS ID",recipeData)
          return controller.addJoinTable('User','Recipe', 1, recipeData.id);
        })
        .then(( join ) => {

          expect(join).to.be.an('object');
          return controller.addRecipe(recipeName[1], recipe[1]);

        })
        .spread(( recipeData, created ) => {
          expect(recipeData.name).to.equal(recipeName[1]);
          expect(recipeData.recipe.ingredients).to.equal(recipe[1].ingredients);
          return controller.addJoinTable('User','Recipe', 1, recipeData.id);
        })
        .then(( join ) => {
          expect(join).to.be.an('object');
          done();
        })
        .catch((error) => {
          done(error);
        });

    });
    it ( 'should retrieve all recipes for a user', (done) => {
      controller.getAllJoin( 'Users', username, 'Recipe' )
        .then(( recipeData ) => {
          expect(recipeData[0].Recipes[0].name).to.equal(recipeName[0]);
          expect(recipeData[0].Recipes[1].name).to.equal(recipeName[1]);
          done();
        })
        .catch((error)=>{
          done(error);
        })
    })

  });
  describe ( "Meals", () => {
    it('should add a meal to the database with a recipe', (done) => {
      controller.addMeal("Sausage and Chips")
        .spread((meal)=>{
          console.log("HERE IS MEAL",meal);
          expect(meal.dataValues.name).to.equal('Sausage and Chips');
          MealId = meal.dataValues.id;
          expect(MealId).to.equal(1);
          return controller.addJoinTable('User', 'Meal', MealId, 1)
        })
        .then((join) => {
          expect(join).to.be.an('object');
          return controller.addJoinTable('Meal', 'Recipe', 1, 2)
        })
        .then((join)=>{
          expect(join).to.be.an('object');
          done();
        })
    })
    it ('should retrieve the meal from the database', (done)=> {
      controller.getAllJoin('Users', username, 'Meals')
        .then((mealData)=>{
          expect(mealData[0].Meals[0].name).to.equal('Sausage and Chips')
          done();
        })
    })
  });
  describe ('Events',()=> {
    var eventName = 'Lunch Time';
    var mealTime = '07:15:00';
    it('should add an Event to the database with a meal id', (done)=>{
      controller.addEvent(eventName,mealTime,1)
        .spread((events)=>{
          expect(events.get('title')).to.equal(eventName);
          expect(events.get('start')).to.equal(mealTime);
          var EventId = events.get('id');
          expect(EventId).to.equal(1);
          return controller.addJoinTable('User', 'Event', 1, EventId)
        })
        .then((join) => {
          expect(join).to.be.an('object');
          done();
        })
    });
    it('should retrieve meals from events',(done) => {
      controller.getAllHasMany('Meals',[{"id":{"$eq":1}}])
        .then((results)=>{

          expect(results[0].dataValues.name).to.equal('Sausage and Chips');
          console.log("Test",results);
          done();
        })
        .catch((error)=> {
          console.log( "Error retrieving Meals from Events", error );
        });
    })
    it('should retrieve recipes from meals', (done) => {
      controller.getAllJoin('Meals','Sausage and Chips','Recipe')
        .then((data)=>{
          console.log(data);
          done();
        })
        .catch((error)=>{
          console.error(error);
      })
    })
  })
  after((done) => {
    database.pathName = '../db';
    done();
  })
});

