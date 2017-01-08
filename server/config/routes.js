var controller = require('./../controllers');
var router = require('express').Router();


router.get('/', function(req, res) {
  res.sendfile('../client/build/');
});
router.route('/recipe')
  .get(controller.GetRecipes)
  .post(controller.AddRecipe);

router.route('/meals')
  .get(controller.GetMeals)
  .post(controller.AddMeal);

router.route('/events')
  .get(controller.GetEvents)
  .post(controller.AddEvent);

router.route('/users')
  .post(controller.AddUser);

module.exports = router;
