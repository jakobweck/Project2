import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './admin.less';
import view from './admin.stache';
import 'can-stache-bindings';

function event(name, month, day, timeStart, timeEnd) {
  //"private variables" for new event objects
    const m_name = name;
    const m_month = month;
    const m_day = day;
    const m_timeStart = timeStart;
    const m_timeEnd = timeEnd;
  }
  event.prototype.getName = function(){
    return this.eventName;
  }
  event.prototype.getTime = function(){
    return this.eventTime;
  };

export const ViewModel = DefineMap.extend({
  page: 'adminList',
  message: {
    value: 'This is the admin component'
  },

  // initializing variables as global variables
  newEvent() {
    window.name = document.getElementById("eventName").value;
    window.month = document.getElementById("eventMonth").value;
    window.day = document.getElementById("eventDay").value;
    window.timeStart = document.getElementById("eventStart").value;
    window.timeEnd = document.getElementById("eventEnd").value;

    event(name, month, day, timeStart, timeEnd);
  },
  // test function for global variables
  printItems () {
    console.log(name);
    console.log(month);
    console.log(day);
    console.log(timeStart);
    console.log(timeEnd);
  },
});

export default Component.extend({
  tag: 'adminComponent-',
  ViewModel,
  view
});
