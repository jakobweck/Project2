//This is the definition for creating events
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var eventSchema = new Schema({
  name: {
    type: String,
    required: 'Enter the Name of the Event'
  },
  month: {
    type: String,
    required: 'Enter Month'
  },
  day: {
    type: String,
    required: 'Enter Day'
  },
  startTime{
    type: Date,
    required: 'Enter Start Time'
  },
  endTime{
    type: Date,
    required: 'Enter End Time'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Events', eventSchema);
