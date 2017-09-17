'use strict';
module.exports = function(app) {
  var eventList = require('../controllers/plan-ez-eventGetterController');

  // eventList Routes
  app.route('/eventList')
    .get(eventList.list_all_events)
    .post(eventList.create_a_event);


  app.route('/eventList/:eventId')
    .get(eventList.read_an_event)
    .put(eventList.update_event_availability)
    .delete(eventList.delete_an_event);
};
