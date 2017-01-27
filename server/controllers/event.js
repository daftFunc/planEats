var model = require('../models');
module.exports = {

  post: (req, res) => {
    var UserId;
    var EventId;

    model.findUser(req.body.username)

      .then((user) => {
        //debugging
        //console.log(user);
        UserId = user.dataValues.id;
        return model.addEvent(req.body.title, req.body.start, req.body.meal_id, req.body.username + req.body.start);
      })

      .spread((events, created) => {
        if ( !created ) {
          throw new Error("Event already exists for this user");
        } else {
          EventId = events.get('id');
          return model.addJoinTable('User', 'Event', UserId, EventId);
        }
      })

      .then((join) => {
        res.sendStatus(201);
        console.log('Event created!', join);
      })

      .catch((error) => {
        console.error('Event error', error);
        res.status(304).send(error);
      });
  },

  get: (req, res) => {
    //debugging
    //console.log("Headers", req.headers.username);

    model.getAllJoin('Users', req.headers.username, 'Events')

      .then((events) => {
        console.log(events);
        res.json(events);
      })

      .catch((error) => {
        console.log('Error getting event', error);
        res.send(error);
    });
  },

  put: (req, res) => {
    var EventId;
    var Name;
    var MealTime;
    var MealId;

    model.findUser(req.headers.username)

      .then(() => {
        Name     = req.body.title;
        MealTime = req.body.start;
        EventId  = req.body.id;
        return model.editEvent(Name, MealTime, EventId)
      })

      .then((done) => {
        res.sendStatus(201);
        console.log('Event edited', done);
      })

      .catch((error) => {
        console.log('Error', error);
        res.status(304).send(error);
      });
  },
  delete: (req, res) => {

    var EventId;
    model.findUser(req.headers.username)

      .then(() => {
        EventId = req.headers.id;
        return model.removeEvent(EventId)
      })

      .then((done) => {
        res.sendStatus(201);
        console.log('Event deleted', done);
      })
      .catch((error) => {
        console.log('Error', error);
        res.sendStatus(304).send(error);
      })
  }
}