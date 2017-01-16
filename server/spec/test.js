var request = require('supertest');
var expect = require('chai').expect;

request = request('http://localhost:3001');
describe('Server routes',function() {

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
        .field('username', 'Rick')
        .field('name', 'Salad')
        .field('recipe', '{\
          "name":"Name of recipe",\
          "ingredients": ["Lettuce", "Dressing"],\
          "time": 15,\
          "servings": 2,\
          "directions": "Toss and serve",\
          "nutrition": "0 calories"\
        }')
        .expect(201)
        .end(function (err, res) {
          if (err) {
            console.log(res.body);
            throw err;
          } else {
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
              done();
            }
          })
      });
    });
  });
});

// router.route('/getEventMeal')
//   .get(model.meals.getEventMeal);

