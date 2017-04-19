var model = require('../models')
module.exports = {
  get: (req, res) => {
    model.findUser(req.headers.username)

      .then((user) => {
        if (user) {
          // debugging
          // console.log("Users", user);
          var UserId = user.dataValues.id
          return model.getShoppingList(UserId)
        } else {
          res.status(400).send('Can not find User')
        }
      })

      .then((list) => {
        res.status(201).send(list)
      })

      .catch((error) => {
        console.error(error)
        res.sendStatus(304)
      })
  },
  put: (req, res) => {
    // debugging
    // console.log("body", req.body)

    model.findUser(req.body.username)

      .then((user) => {
        var UserId = user.dataValues.id
        return model.updateShoppingList(req.body.list, UserId)
      })

      .then((list) => {
        res.sendStatus(201)
      })

      .catch((error) => {
        res.status(304).send(error)
      })
  }
}
