var controller = require('./../controllers');
var router = require('express').Router();
var curl = require('curlrequest');

router.get('/', function(req, res) {
  res.sendfile('../client/build/');
});

router.route('/recipe')
  .get(controller.recipe.get)
  .post(controller.recipe.post);

router.route('/meals')
  .get(controller.meals.get)
  .post(controller.meals.post);

router.route('/events')
  .get(controller.event.get)
  .post(controller.event.post)
  .put(controller.event.put)
  .delete(controller.event.delete);

router.route('/users')
  .post(controller.user.post);

router.route('/getEventRecipes')
  .get(controller.recipesFromEvents.getMealsFromEvents);

router.route('/shoppinglist')
  .get(controller.shoppingList.get)
  .put(controller.shoppingList.put);

router.route('/searchRestaurants')
  .post(function(req, res) {
    curl.request({url: 'https://api.eatstreet.com/publicapi/v1/restaurant/search?method=both&street-address=' + req.body.location, headers: {'X-Access-Token': 'cc02e93d4e63df1f'}}, function (err, data) {
      data = JSON.parse(data);
      res.send(data);
    });
  });

router.route('/apiKeys')
  .get(controller.apiKeys.get)
  .post(controller.apiKeys.post);

module.exports = router;
