var request = require('supertest');
var database = require('../DatabaseName');
var db = require('./database');
database.pathName = '../spec/database';
var expect = require('chai').expect;

request = request('http://localhost:3001');
describe('Server routes',function() {

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
  })
  describe('User routes', function () {
    describe('POST /users', function () {
      it('Returns 201', function (done) {
        request
          .post('/api/users')
          .field('username', 'Rick')
          .expect(201)
          .end(function (err, res) {
            if (err) {
              console.log(res.body)
              throw err;
            }else {
              console.log(res.body);
              done();
            }

          })

      });
    });
  });
  describe('POST /recipe', function () {
    it('Returns 201', function (done) {
      request
        .post('/api/recipe')
        .send('username', 'Rick')
        .send('name', 'Salad')
        .send('recipe', {
          "name":"Name of recipe",
          "ingredients": ["Lettuce", "Dressing"],
          "time": 15,
          "servings": 2,
          "directions": "Toss and serve",
          "nutrition": "0 calories"
        })
        .expect(201)
        .end(function (err, res) {
          if (err) {
            console.log(res.body);
            throw err;
          } else {
            console.log(res.body);
            done();
          }

        })

    });
  });

  describe('Recipe routes', function () {
    describe('GET /recipe', function () {
      it('Responds with a recipe', function (done) {
        request
          .get('/api/recipe')
          .field('username','Rick')
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.log(res.body)
              throw err;
            } else {
              console.log(res.body);
              done();
            }
          })

      });
    });
  });

  describe('POST /meals', function () {
    it('Returns 201', function (done) {
      request
        .post('/api/meals')
        .field('username','Rick')
        .field('name', 'Pizza and Salad')
        .field('recipe', [0])
        .expect(201)
        .end(function (err, res) {
          if (err) {
            console.log(res.body)
            throw err;
          } else {
            console.log(res.body);
            done();
          }
        })

    });
  });

  describe('Meal routes', function () {
    describe('GET /meals', function () {
      it('Responds with a meal', function (done) {
        request
          .get('/api/meals')
          .field('username','Rick')
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.log(res.body)
              throw err;
            } else {
              console.log(res.body);
              done();
            }
          })

      });
    });
  });

  describe('POST /events', function () {
    it('Returns 201', function (done) {
      request
        .post('/api/events')
        .field('username','Rick')
        .field('meal_id', '1')
        .field('meal_time', '7:05')
        .expect(201)
        .end(function (err, res) {
          if (err) {
            console.log(res.body)
            throw err;
          } else {
            console.log(res.body);
            done();
          }
        })

    });
  });

  describe('Event routes', function () {
    describe('GET /events', function () {
      it('Responds with an event', function (done) {
        request
          .get('/api/events')
          .field('username','Rick')
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.log(res.body)
              throw err;
            } else {
              console.log(res.body);
              done();
            }
          })
      });
    });
  });
  after((done) => {
    database.pathName = '../db';
    done();
  })
});

// router.route('/getEventMeal')
//   .get(controllers.meals.getEventMeal);

