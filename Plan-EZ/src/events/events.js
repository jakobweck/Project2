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


var populateEventBox = function populateEventBox(){
  var eventBox = document.getElementById("eventSelect");
  if (window.eventArray) {
      for (i = 0; i < window.eventArray.length; i++) {
          var name = window.eventArray[i].name;
          option = document.createElement('option');
          option.value = JSON.stringify(window.eventArray[i]);
          option.text = name;
          eventBox.add(option);
      }
  }
}
window.selectEvent = function(){
    window.alert("Select");
    var eventSelect = document.getElementById("eventSelect");
    var selectedEvent = JSON.parse(eventSelect.options[eventSelect.selectedIndex].value)
    window.checkboxes = [];
    if (selectedEvent) {
        window.name = selectedEvent.name;
        window.month = selectedEvent.month;
        window.day = selectedEvent.day;
        window.startTimeArray = selectedEvent.startTimes;
        window.endTimeArray = selectedEvent.endTimes;
        window.host = selectedEvent.host;
        window.attendeesArray = selectedEvent.attendees;
        var infoString = "Selected Event: " + window.name +" on " + window.month +" "+ window.day + ".<br> Host: " + window.host;
        var eventInfo = document.getElementById("eventInfo");
        eventInfo.innerHTML = infoString;
        var timeSlotString = "";
        for (i=0; i<window.startTimeArray.length; i++){
          timeSlotString += window.startTimeArray[i] + "-" +window.endTimeArray[i];
          if (i != window.startTimeArray.length - 1){
            timeSlotString+= ", ";
          }
          var checkDiv = document.getElementById("checkBoxDiv");
          var box = document.createElement("input");
          box.setAttribute("id", "box"+i.toString());
          var label = document.createElement("label");
          label.htmlFor = "box"+i.toString();
          label.innerHTML = window.startTimeArray[i] + "-" +window.endTimeArray[i];
          box.setAttribute("type", "checkbox");
          checkDiv.appendChild(box);
          checkDiv.appendChild(label);
          window.checkboxes.push(box);
        }
        var attendeesString = "Attendees: ";
        for(i=0; i<window.attendeesArray.length; i++){
            attendeesString += window.attendeesArray[i];
            if (i != window.attendeesArray.length - 1){
                attendeesString+= ", ";
            }
        }
        document.getElementById("slots").innerHTML = timeSlotString;
        document.getElementById("attendees").innerHTML = attendeesString;
        document.getElementById("submitButton").disabled = false;

    }

}

window.addEventListener('load', populateEventBox, false);


export const ViewModel = DefineMap.extend({

  //Defining Values For the Variables Referenced in login.stache
  page: 'eventList',
  message: {
    value: 'Event Page'
  },
  selectEvent(){
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
  get user(){
      return window.currentUser;
  },

  // TODO: fix only refreshes when navigating away
  // add name to the attendees list
  submit() {
    window.people = (window.people +", "+window.a_name);
    var userObj = {
        name: window.currentUser,
        timeslots: []
      }
    for(i = 0; i<window.checkboxes.length; i++){
        if (window.checkboxes[i].checked){
            userObj.timeslots.push(window.startTimeArray[i] + "-" +window.endTimeArray[i]);
        }
    }

  }
});
export default Component.extend({
  tag: 'eventComponent-',
  ViewModel,
  view
});
