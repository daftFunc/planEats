var controller = require('./../controllers');
var router = require('express').Router();

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
  .get(controller.events.get)
  .post(controller.events.post);

router.route('/events')
  .get(controller.users.get)
  .post(controller.users.post);

module.exports = router;