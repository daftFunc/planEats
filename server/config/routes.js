var controller = require('./../controllers');
var model = require('./../model')
var router = require('express').Router();


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
  .post(model.event.post);

router.route('/users')
  .post(model.user.post);
router.route('/getEventRecipes')
  .get(model.getRecipesFromEvents);

module.exports = router;
