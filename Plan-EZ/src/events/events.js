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

window.selectEvent = function(){
    window.youHost = false;
    var eventSelect = document.getElementById("eventSelect");
    window.currentEvent = JSON.parse(eventSelect.options[eventSelect.selectedIndex].value)
    var selectedEvent = window.currentEvent;
    window.checkboxes = [];
    if (selectedEvent) {
        window.name = selectedEvent.name;
        window.month = selectedEvent.month;
        window.day = selectedEvent.day;
        window.startTimeArray = selectedEvent.startTimes;
        window.endTimeArray = selectedEvent.endTimes;
        window.host = selectedEvent.host;
        window.attendeesArray = selectedEvent.attendees;
        if (window.host == window.currentUser){
            document.getElementById("canAttend").innerText = "You are the host of this event!";
            window.youHost = true;
        }
        else{
            document.getElementById("canAttend").innerText = "Can you attend?";

        }

        var infoString = "Selected Event: " + window.name +" on " + window.month +" "+ window.day + ".<br> Host: " + window.host;
        var eventInfo = document.getElementById("eventInfo");
        eventInfo.innerHTML = infoString;
        var timeSlotString = "";
        document.getElementById('checkBoxDiv').innerHTML="";

        for (i=0; i<window.startTimeArray.length; i++){
            window.checkboxes.splice(i, 1);
            timeSlotString += window.startTimeArray[i] + "-" +window.endTimeArray[i];
          if (i != window.startTimeArray.length - 1){
            timeSlotString+= ", ";
          }
          if(!youHost) {
              document.getElementById("submitButton").disabled = false;
              var checkDiv = document.getElementById("checkBoxDiv");
              var box = document.createElement("input");
              box.setAttribute("id", "box" + i.toString());
              var label = document.createElement("label");
              label.htmlFor = "box" + i.toString();
              label.innerHTML = window.startTimeArray[i] + "-" + window.endTimeArray[i];
              box.setAttribute("type", "checkbox");
              checkDiv.appendChild(box);
              checkDiv.appendChild(label);
              window.checkboxes.push(box);
          }
          else{
              document.getElementById("submitButton").disabled = true;
          }
        }
        var attendeesString = "Attendees: ";
        for(i=0; i<window.attendeesArray.length; i++){
            attendeesString += window.attendeesArray[i].name;
            attendeesString += "(";
            var j;
            for (j=0; j<window.attendeesArray[i].timeslots.length; j++){
                attendeesString += window.attendeesArray[i].timeslots[j];
                if (j != window.attendeesArray[i].timeslots.length - 1){
                    attendeesString+= ", ";
                }
            }
            attendeesString += ")";
            if (i != window.attendeesArray.length - 1){
                attendeesString+= ", ";
            }
        }
        document.getElementById("slots").innerHTML = timeSlotString;
        document.getElementById("attendees").innerHTML = attendeesString;
        if (youHost) {
            document.getElementById("submitButton").disabled = true;
        }
        else{
            document.getElementById("submitButton").isDisabled = false;
        }
    }
    else{
        document.getElementById("eventInfo").innerHTML = "";
        document.getElementById("attendees").innerHTML = "";
        document.getElementById("slots").innerHTML = "";
        document.getElementById("checkBoxDiv").innerHTML = "";
        document.getElementById("submitButton").disabled = true;

        infoString = "";
    }

}


export const ViewModel = DefineMap.extend({

  //Defining Values For the Variables Referenced in login.stache
  page: 'eventList',
  message: {
    value: 'Event Page'
  },
  callPopulate(){
      populateEventBox();
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
    window.currentEvent.attendees.push(userObj);
    var eventIndex = document.getElementById("eventSelect").selectedIndex -1;
    window.eventArray.splice(eventIndex, 1);
    window.eventArray.push(window.currentEvent);
    localStorage.setItem("events", JSON.stringify(window.eventArray));
    populateEventBox();
    document.getElementById("eventSelect").selectedIndex = 0;
    selectEvent();

  }
});
export default Component.extend({
  tag: 'eventComponent-',
  ViewModel,
  view
});
