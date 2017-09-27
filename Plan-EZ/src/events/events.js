//Events Component
//This Component handes the JS behind the Events page, which is our
//user mode for the application
//This component controls only interactions with the events page.

import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './events.less';
import view from './events.stache';

function printTimeSlots(){

}

window.addEventListener('DOMContentLoaded', printTimeSlots());

export const ViewModel = DefineMap.extend({

  //Defining Values For the Variables Referenced in events.stache
  page: 'eventList',
  message: {
    value: 'Event Page'
  },

  // Getters for the stache file
  get event_month() {
    return (window.month);
  },
  get event_name() {
    return window.name;
  },
  get slots(){
      var slotString = "";
      if (window.startTimeArray && window.endTimeArray) {
          for (i = 0; i < window.startTimeArray.length; i++) {
              slotString += window.startTimeArray[i];
              if (window.hour != 24){
                slotString += window.hour;
              }
              slotString += "-" + window.endTimeArray[i];
              if (window.hour != 24){
                  slotString += window.hour;
              }
              slotString += "    ";
          }
      }
      return slotString;

  },
  get event_day() {
    return window.day;
  },
  get event_hour() {
    if (window.hour != 24) {
        return window.hour;
    }
    else{
      return "";
    }
  },
  get event_start() {
    return window.timeStart;
  },
  get event_end() {
    return window.timeEnd;
  },
  get attendees(){
    return window.people;
  },
  // TODO: fix only refreshes when navigating away
  // add name to the attendees list
  submit() {
    window.a_name = document.getElementById("avail_name").value;
    window.people = (window.people +", "+window.a_name);
  }
});
export default Component.extend({
  tag: 'eventComponent-',
  ViewModel,
  view
});
