//Admin Mode Component
//This is all the scripting behind the admin mode page.
//We Utilized doneJS and canJS frameworks in order to make
//individual, modular components for our application

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
window.numBoxes = 0;

// sets input event variables to constants
function event(name, month, day, timeStart, timeEnd) {
    const m_name = name;
    const m_month = month;
    const m_day = day;
    const m_timeStart = timeStart;
    const m_timeEnd = timeEnd;
  }
  
 function checkIfOverlap(month, day, timeStart, timeEnd) {
	var m = month;
	var d = day;
	var ts = timeStart;
	var te = timeEnd;
	
	var eventsArray = [];
  
  }

function setupNewStartBox(){
    //0 for the init. boxes, 1 for the first additional start box
    window.numBoxes++;
    var startDiv = document.getElementById("startInput");
    var newDiv = document.createElement('div');
    newDiv.setAttribute("boxIndex", window.numBoxes.toString());
    // start the selection framework
    //when this box is changed, fill in the corresponding end box.
    var uiIndex = window.numBoxes+1;
    var innerHtml = "<select onchange='setupNewEndBox(this);check()'><option value='null' selected disabled>" + "Start Time " + uiIndex + "</option>";
    // if the hour scheme is 12 hours
    if (document.getElementById("eventHour").value != "24") {
        for (i=0; i<2; i++){
            // preface with 12 and 12:30 first because of weird naming structure
            innerHtml += "<option value='12'>12";
            if (i ==0){
                innerHtml += "AM</option>";
            }
            else{
                innerHtml += "PM</option>";
            }
            innerHtml += "<option value='12:30'>12:30";
            if (i ==0){
                innerHtml += "AM</option>";
            }
            else{
                innerHtml += "PM</option>";
            }
            var j;
            for (j = 1; j <= 11; j += 1) {
                innerHtml += "<option value='" + j + "'>" + j;
                if (i ==0){
                    innerHtml += "AM</option>";
                }
                else{
                    innerHtml += "PM</option>";
                }

                innerHtml += "<option value='" + j + ":30'>" + j + ":30";
                if (i ==0){
                    innerHtml += "AM</option>";
                }
                else{
                    innerHtml += "PM</option>";
                }
            }
        }

    }
    // if hour scheme is 24 hours
    else {
        for (i = 0; i < 24; i += 1) {
            innerHtml += "<option value='" + i + "'>" + i + "</option>";
            innerHtml += "<option value='" + i + ":30'>" + i + ":30</option>";
        }
        innerHtml += "</select><input ";
    }
    // assign new script to file
    newDiv.innerHTML = innerHtml;
    startDiv.appendChild(newDiv);

}

window.setupNewEndBox = function(send) {
    // create drop down menu framework
    var sender = send.parentNode;
    var endDiv = document.getElementById("endInput");
    var index = sender.getAttribute("boxindex");
    //var newDiv = document.getElementById("endBox" + index);
    var newDiv = endDiv.querySelector('[boxindex="'+index+'"]');
    var uiIndex = parseInt(index) + 1;


    var innerHtml = "<select onchange='check()'><option value='null' selected>" + "End Time " + uiIndex+ "</option>";
    // if the hour scheme is 12

    if (document.getElementById("eventHour").value != "24") {
        // get the start value and make it into a number
        var startBox = send;
        var start_time = startBox.options[startBox.selectedIndex].text;
        var startIndex = startBox.selectedIndex;
        var new_start = parseInt(start_time);

        // if necessary, make some additions
        if (start_time.indexOf(":") == -1) {
            innerHtml += "<option value='" + start_time.slice(0,-2) + ":30'>" + start_time.slice(0,-2) + ":30";
            // anticipate weird US time naming conventions 12AM-12:30AM-1AM
            if(startIndex<25){
                innerHtml+= "AM"  + "</option>";
            }
            else{
                innerHtml+= "PM"  + "</option>";
            }
            if (new_start == 24) {
                new_start = 0;
            }
        }
        if (start_time.indexOf("PM") !== -1 && start_time !== "12PM" && start_time !== "12:30PM"){

            new_start +=12;
        }
        if(startIndex == 0 || startIndex == 1){
            new_start -= 12;
        }

        for (i = new_start + 1; i <= 23; i += 1) {
            var time = i%12;
            if (time == 0){
                time = 12;
            }

            innerHtml += "<option value='" + time + "'>" + time;
            if (i<11){
                innerHtml += "AM"  + "</option>";
            }
            else{
                innerHtml += "PM"  + "</option>";
            }
            innerHtml += "<option value='" + time + ":30'>" + time + ":30";
            if (i<11){
                innerHtml += "AM"  + "</option>";
            }
            else{
                innerHtml += "PM"  + "</option>";
            }
        }
        innerHtml += "</select><input ";

    }
    // if the hour scheme is 24
    else {
        // get the previous start value
        var start_time = send.value;
        var new_start = parseInt(start_time);
        // if necessary, make additions
        if (start_time.indexOf(":") == -1) {
            innerHtml += "<option value='" + start_time + ":30'>" + start_time + ":30</option>";
        }
        for (i = new_start + 1; i < 24; i += 1) {
            innerHtml += "<option value='" + i + "'>" + i + "</option>";
            innerHtml += "<option value='" + i + ":30'>" + i + ":30</option>";
        }
        innerHtml += "</select><input ";
    }
    // add script to file
    newDiv.innerHTML = innerHtml;
    newDiv.setAttribute("boxindex", index.toString());
    endDiv.appendChild(newDiv);
}

//Entering The View Mode of the App
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
    if (!window.eventArray){
        window.eventArray = [];
    }
    var allStartDivs = document.getElementById('startInput').getElementsByTagName('div');
    var allEndDivs = document.getElementById('endInput').getElementsByTagName('div');

    var name = document.getElementById(("eventName")).value;
    var nameConflict = false;
    var unfilledSlot = false;
    for (i =0; i<window.eventArray.length; i++){
        if (window.eventArray[i].name === name){
            nameConflict = true;
        }
    }
    for (i=0; i<allStartDivs.length; i++){
        if (allStartDivs[i].getElementsByTagName('select')[0].selectedIndex == 0 || allEndDivs[i].getElementsByTagName('select')[0].selectedIndex == 0){
            unfilledSlot = true;
        }
    }
    if (nameConflict){
        window.alert("There is already an event with this name. Cancelling event creation.");
    }
    if (unfilledSlot){
        window.alert("One of the time slots is not filled. Cancelling event creation.");
    }
    if(!nameConflict && !unfilledSlot) {
        window.name = document.getElementById("eventName").value;
        window.month = document.getElementById("eventMonth").value;
        window.day = document.getElementById("eventDay").value;
        window.hour = document.getElementById("eventHour").value;
        //window.currentUser = document.getElementById("host").value;
        window.startTimeArray = [];
        window.endTimeArray = [];
        var hostUser = {
            name: window.currentUser,
            timeslots: []
        }


        for (i = 0; i < allStartDivs.length; i++) {
            var startTimeBox = allStartDivs[i].getElementsByTagName('select')[0];
            var endTimeBox = allEndDivs[i].getElementsByTagName('select')[0];
            var startTime = startTimeBox.options[startTimeBox.selectedIndex].text;
            var endTime = endTimeBox.options[endTimeBox.selectedIndex].text;

            startTimeArray.push(startTime);
            endTimeArray.push(endTime);
            hostUser.timeslots.push(startTime + "-" + endTime);
        }
        window.attendeesArray = [hostUser];

        window.timeStart = document.getElementById("eventStart").value;
        window.timeEnd = document.getElementById("eventEnd").value;
        var eventObj = {
            name: window.name,
            month: window.month,
            day: window.day,
            startTimes: window.startTimeArray,
            endTimes: window.endTimeArray,
            host: window.currentUser,
            attendees: window.attendeesArray,
            tasks: window.tasksArray,
            twentyFour: ((window.hour=="24"))

        };
        window.eventArray.push(eventObj);
        localStorage.setItem('events', JSON.stringify(window.eventArray));
        window.alert("New event created!");
        window.location.href = '/eventList';
    }
  },
    addTask(){
      var taskBox = document.getElementById("taskBox");
      var taskTextArea = document.getElementById("tasksText");
      var taskString = taskBox.value;
        if (!window.tasksArray) {
            window.tasksArray = [];
        }
        var task = {
            name: taskString,
            user: ""

        };
        var index = window.tasksArray.map(function(e) { return e.name; }).indexOf(taskString);
      if (taskString != "" && (index == -1)){

          window.tasksArray.push(task);
          var newTaskDiv = document.createElement("div");
          newTaskDiv.innerHTML += "<br>" + taskString + "   " ;
          newTaskDiv.style.display = 'inline';
          var removeButton = document.createElement("button");
          removeButton.innerText = "Remove";
          var removeTask = function(){
              window.tasksArray.splice(window.tasksArray.indexOf(task), 1);
              this.parentNode.parentNode.removeChild(this.parentNode);
          }
          removeButton.addEventListener("click", removeTask)
          newTaskDiv.appendChild(removeButton);
          taskTextArea.appendChild(newTaskDiv);
          taskBox.value = "";
      }
      else{
          window.alert("Task already exists");
          taskBox.value = "";
      }

    },
    m_event: {
    m_name: window.name,
    m_month: window.month,
    m_day: window.day,
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
  addTimeSlot(){
      setupNewStartBox();
      var endDiv = document.getElementById("endInput");
      var newDiv = document.createElement('div');
      newDiv.setAttribute("boxindex", window.numBoxes.toString());
      var innerHtml = "<select onchange='check()'><option value='null' selected></option>";
      newDiv.innerHTML = innerHtml;
      endDiv.appendChild(newDiv);
      document.getElementById("eventHour").disabled = true;

  }
});

export default Component.extend({
  tag: 'adminComponent-',
  ViewModel,
  view
});
