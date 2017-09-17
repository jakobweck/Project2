///This is the Controller File for the API
//This is where you can define new methods for the API

'use strict';
var mongoose = require('mongoose'),
  event = mongoose.model('Events');

exports.list_all_events = function(req, res) {
  Event.find({}, function(err, Event) {
    if (err)
      res.send(err);
    res.json(Event);
  });
};




exports.create_a_event = function(req, res) {
  var new_Event = new Event(req.body);
  new_Event.save(function(err, Event) {
    if (err)
      res.send(err);
    res.json(Event);
  });
};


exports.read_an_event = function(req, res) {
  Event.findById(req.params.EventId, function(err, Event) {
    if (err)
      res.send(err);
    res.json(Event);
  });
};


exports.update_event_availability = function(req, res) {
  Event.findOneAndUpdate({
    _id: req.params.EventId
  }, req.body, {
    new: true
  }, function(err, Event) {
    if (err)
      res.send(err);
    res.json(Event);
  });
};


exports.delete_an_event = function(req, res) {


  Event.remove({
    _id: req.params.EventId
  }, function(err, Event) {
    if (err)
      res.send(err);
    res.json({
      message: 'Event successfully deleted'
    });
  });
};
