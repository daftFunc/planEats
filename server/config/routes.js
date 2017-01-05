var controller = require('./../controllers');
var router = require('express').Router();

router.get('/', function(req, res) {
  res.sendfile('../client/build/');
});

router.get('/recipe', controller.recipe.get);
// router.post('/recipe', controller.recipe.post);

router.get('/meals', controller.meals.get);
router.post('/meals', controller.meals.post);

router.get('/events', controller.events.get);
router.post('/events', controller.events.post);

router.get('/users', controller.users.get);
router.post('/users', controller.users.post);

module.exports = router;