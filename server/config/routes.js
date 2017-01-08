var controller = require('./../controllers');
var model = require('./../model')
var router = require('express').Router();


router.get('/', function(req, res) {
  res.sendfile('../client/build/');
});
router.route('/recipe')
  .get(model.recipe.get)
  .post(model.recipe.post);

router.route('/meals')
  .get(model.meals.get)
  .post(model.meals.post);

router.route('/events')
  .get(controller.GetEvents)
  .post(controller.AddEvent);

router.route('/users')
  .post(model.user.post);

module.exports = router;
