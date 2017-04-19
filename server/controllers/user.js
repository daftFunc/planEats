var model = require('../models')

module.exports = {

  post: (req, res) => {
    // debugging
    console.log('Username', req.body.username)

    model.addUser(req.body.username)

      .spread((user, created) => {
        res.status(created ? 201 : 404).send(user)
      })
  }
}
