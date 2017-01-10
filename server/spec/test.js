var request = require('supertest');
var expect = require('chai').expect;
var app = require('../server');

// request = request('http://localhost:3001');

describe('Recipe routes', function() {
   describe('GET /recipe', function() {
    it('Responds with text', function(done) {
      request(app)
        .get('/recipe')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(201, done);
    });
  });
  describe('POST /recipe', function() {
    it('Returns 201', function(done) {
      request(app)
        .post('/recipe')
        .field('name', 'Salad')
        .field('recipe', '{ingredients: ["Lettuce", "Dressing"], time: 15, servings: 2, directions: "Toss and serve", nutrition: "0 calories"}')
        .expect(201, done);
    });
  });
});


describe('Meal routes', function() {
  describe('GET /meals', function() {
    it('Responds with a string', function(done) {
      request(app)
        .get('/meals')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(201, done);
    });
  });
  describe('POST /meals', function() {
    it('Returns 201', function(done) {
      request(app)
        .post('/meals')
        .field('name', 'Pizza and Salad')
        .field('favorited', 'false')
        .expect(201, done);
    });
  });
});


describe('Event routes', function() {
  describe('GET /events', function() {
    it('Responds with a string', function(done) {
      request(app)
        .get('/events')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(201, done);
    });
  });
  describe('POST /events', function() {
    it('Returns 201', function(done) {
      request(app)
        .post('/events')
        .field('meal_id', '1')
        .field('meal_time', '7:05')
        .expect(201, done);
    });
  });
});


describe('User routes', function() {
  describe('POST /users', function() {
    it('Returns 201', function(done) {
      request(app)
        .post('/users')
        .field('username', 'Rick')
        .expect(201, done);
    });
  });
});

// router.route('/getEventMeal')
//   .get(model.meals.getEventMeal);

