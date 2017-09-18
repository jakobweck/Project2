//Events Component
//This Component handes the JS behind the Events page, which is our
//user mode for the application
//This component controls only interactions with the events page.

import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './events.less';
import view from './events.stache';
import m_event from 'src/admin/admin.js'

export const ViewModel = DefineMap.extend({

  //Defining Values For the Variables Referenced in events.stache
  page: 'eventList',
  message: {
    value: 'Event Page'
  },
  event_name: {
    value: window.name
  },
  event_month: {
    value: window.month
  },
  event_day: {
    value: window.day
  },
  event_hour: {
    value: window.hour
  },
  event_start: {
    value: window.timeStart
  },
  event_end: {
    value: window.timeEnd
  },
  date: {
    value: 'Date here'
  },
  time: {
    value: 'Time here'
  },
});

export default Component.extend({
  tag: 'eventComponent-',
  ViewModel,
  view
});
