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
    window.taskChecks = [];
    document.getElementById("tasksDiv").innerHTML ="<h3>Tasks</h3>";

    if (selectedEvent) {
        window.name = selectedEvent.name;
        window.month = selectedEvent.month;
        window.day = selectedEvent.day;
        window.startTimeArray = selectedEvent.startTimes;
        window.endTimeArray = selectedEvent.endTimes;
        window.host = selectedEvent.host;
        window.attendeesArray = selectedEvent.attendees;
        window.tasksArray = selectedEvent.tasks;
        window.twentyFour = selectedEvent.twentyFour;
        if (window.host == window.currentUser){
            document.getElementById("canAttend").innerText = "";
            window.youHost = true;
        }
        else{
            document.getElementById("canAttend").innerText = "Can you attend?";

        }

        var infoString = "Selected Event: " + window.name +" on " + window.month +" "+ window.day + ".<br> Host: " + window.host;
        if (window.youHost){
            infoString += " (You)";
            document.getElementById("yourUserName").innerHTML = "";
        }
        else{
        }
        var eventInfo = document.getElementById("eventInfo");
        eventInfo.innerHTML = infoString;
        var timeSlotString = "Times ";
        if (window.twentyFour) {
            timeSlotString += "(24 Hour):<br>";
        }
        else{
            timeSlotString += ":<br>";

        }
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
              //document.getElementById("submitButton").disabled = true;
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
        if (window.tasksArray) {
            for (i = 0; i < window.tasksArray.length; i++) {
                var taskDiv = document.createElement("div");
                taskDiv.style.display = 'inline';
                var taskP = document.createElement("p");
                taskP.style.fontWeight = "bold";
                var taskCheck = document.createElement("input");
                taskCheck.type = "checkbox";
                taskCheck.id = "taskBox" + i;
                window.taskChecks.push(taskCheck);
                if (window.tasksArray[i].user != ""){
                    taskCheck.disabled = true;
                }
                taskP.innerText = window.tasksArray[i].name + " (" + window.tasksArray[i].user +  ")    ";
                taskP.appendChild(taskCheck);
                taskDiv.appendChild(taskP);
                document.getElementById("tasksDiv").appendChild(taskDiv);
            }
        }
        document.getElementById("slots").innerHTML = timeSlotString;
        document.getElementById("attendees").innerHTML = attendeesString;

    }
    else{
        document.getElementById("eventInfo").innerHTML = "";
        document.getElementById("attendees").innerHTML = "";
        document.getElementById("slots").innerHTML = "";
        document.getElementById("checkBoxDiv").innerHTML = "";
        document.getElementById("tasksDiv").innerHTML = "";
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
    var anyTimes = false;
    var anyTasks = false;
    var alreadyAttending = false;
    var userObj = {
        name: window.currentUser,
        timeslots: []
      }
    for(i = 0; i<window.checkboxes.length; i++){
        if (window.checkboxes[i].checked){
            anyTimes = true;
            userObj.timeslots.push(window.startTimeArray[i] + "-" +window.endTimeArray[i]);
        }
    }
    for(i = 0; i<window.taskChecks.length; i++){
        if (window.taskChecks[i].checked) {
            anyTasks = true;
            window.currentEvent.tasks[i].user = window.currentUser;
        }
    }
    for(i=0; i<window.attendeesArray.length;i++){
        if (window.attendeesArray[i].name == window.currentUser){
            alreadyAttending = true;
        }
    }
    if ((youHost&&anyTasks) || ((!youHost)&&!alreadyAttending&&anyTimes) || ((!youHost)&&alreadyAttending&&anyTasks)) {
        if (anyTimes && !alreadyAttending) {
            window.currentEvent.attendees.push(userObj);
        }

        var eventIndex = document.getElementById("eventSelect").selectedIndex - 1;
        window.eventArray.splice(eventIndex, 1);
        window.eventArray.push(window.currentEvent);
        localStorage.setItem("events", JSON.stringify(window.eventArray));
        populateEventBox();
        window.alert("Success!");
        document.getElementById("eventSelect").selectedIndex = 0;
        selectEvent();
    }
    else{
        if (youHost){
            window.alert("You have not selected any tasks")
        }
        else {
            if (alreadyAttending){
                window.alert("You are already attending this event and have not selected any tasks.");
            }
            else {
                window.alert("You have not selected any times.");
            }
        }
    }

  }
});
export default Component.extend({
  tag: 'eventComponent-',
  ViewModel,
  view
});
