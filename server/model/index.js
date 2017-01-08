var controller = require('../db');

module.exports = {

  user: {

    post: function(req,res) {
      controller.AddUser(req.body.username);
    }
  },
  recipe: function(req,res) {
    req.body.
  }


}