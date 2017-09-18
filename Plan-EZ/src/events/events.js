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
  get event_month() {
    return (window.month);
  },
  get event_name() {
    return window.name;
  },
  get event_day() {
    return window.day;
  },
  get event_hour() {
    return window.hour;
  },
  get event_start() {
    return window.timeStart;
  },
  get event_end() {
    return window.timeEnd;
  },
  // submit an availability response
  avail_submit: {
    get avail_submit() {
      const a_name = document.getElementById("avail_name");
      const a_avail = document.getElementById("avail_time");

      return (a_name+"is available at "+a_avail)
      console.log(a_name);
      console.log(a_avail);
    },
  },
});

export default Component.extend({
  tag: 'eventComponent-',
  ViewModel,
  view
});
