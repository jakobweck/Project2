import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './admin.less';
import view from './admin.stache';
import 'can-stache-bindings';

/**
 * Sets "private variables" for new event objects
 * @method event
 * @param {} name
 * @param {} month
 * @param {} day
 * @param {} timeStart
 * @param {} timeEnd
 * @return
 */
function event(name, month, day, timeStart, timeEnd) {
    const m_name = name;
    const m_month = month;
    const m_day = day;
    const m_timeStart = timeStart;
    const m_timeEnd = timeEnd;
  }

export const ViewModel = DefineMap.extend({
  page: 'adminList',
  message: {
    value: 'This is the admin component'
  },

/**
 * Initializing variables as global variables
 * @method newEvent
 * @return
 */
  newEvent() {
    window.name = document.getElementById("eventName").value;
    window.month = document.getElementById("eventMonth").value;
    window.day = document.getElementById("eventDay").value;
    window.hour = document.getElementById("eventHour").value;
    window.timeStart = document.getElementById("eventStart").value;
    window.timeEnd = document.getElementById("eventEnd").value;

    event(name, month, day, timeStart, timeEnd);
  },
/**
 * test function for global variables
 * @method printItems
 * @return
 */
  printItems () {
    console.log(name);
    console.log(month);
    console.log(day);
    console.log(hour);
    console.log(timeStart);
    console.log(timeEnd);
  },
});

export default Component.extend({
  tag: 'adminComponent-',
  ViewModel,
  view
});
