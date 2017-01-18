var controller = require('./../controllers');
var model = require('./../model')
var router = require('express').Router();
var curl = require('curlrequest');

router.get('/', function(req, res) {
  res.sendfile('../client/build/');
});
router.route('/recipe')
  .get(model.recipe.get)
  .post(model.recipe.post);
router.route('/getEventMeal')
  .get(model.meals.getEventMeal);

router.route('/meals')
  .get(model.meals.get)
  .post(model.meals.post);

router.route('/events')
  .get(model.event.get)
  .post(model.event.post)
  .put(model.event.put)
  .delete(model.event.delete);

router.route('/users')
  .post(model.user.post);
router.route('/getEventRecipes')
  .get(model.getRecipesFromEvents);

router.route('/searchRestaurants')
  .post(function(req, res) {
    curl.request({url: 'https://api.eatstreet.com/publicapi/v1/restaurant/search?method=both&street-address=' + req.body.location, headers: {'X-Access-Token': 'cc02e93d4e63df1f'}}, function (err, data) {
      data = JSON.parse(data);
      res.send(data);
    });
  });

router.route('/apiKeys')
  .get(model.apiKeys.get)
  .post(model.apiKeys.post);
  
module.exports = router;
