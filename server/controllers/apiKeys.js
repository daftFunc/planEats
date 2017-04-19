var model = require('../models')

module.exports = {

  get: (req, res) => {
    var url = req.headers.url
    return model.getKey(url)

      .then((data) => {
        if (data) {
          res.send(data)
          res.end()
        }
        res.end('No match found')
      })

      .catch((err) => {
        console.log('api get error', err)
      })
  },

  post: (req, res) => {
    return model.postKey(req.body.site, req.body.url, req.body.api_key)

      .then((data) => {
        res.end('Posted key to the database', data)
      })

      .catch((err) => {
        console.log('api post error', err)
      })
  }
}
