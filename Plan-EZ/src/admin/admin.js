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
var numBoxes = 0;

// sets input event variables to constants
function event(name, month, day, timeStart, timeEnd) {
    const m_name = name;
    const m_month = month;
    const m_day = day;
    const m_timeStart = timeStart;
    const m_timeEnd = timeEnd;
  }

function setupNewStartBox(){
    //0 for the init. boxes, 1 for the first additional start box
    numBoxes++;
    var startDiv = document.getElementById("startInput");
    var newDiv = document.createElement('div');
    newDiv.setAttribute("boxIndex", numBoxes.toString());
    // start the selection framework
    //when this box is changed, fill in the corresponding end box.
    var innerHtml = "<select onchange='setupNewEndBox(this);check()'><option value='null' selected></option>";
    // if the hour scheme is 12 hours
    if (document.getElementById("eventHour").value != "24") {
        // preface with 12 and 12:30 first because of weird naming structure
        innerHtml += "<option value='12'>12</option>";
        innerHtml += "<option value='12:30'>12:30</option>";
        for (i = 1; i <= 11; i += 1) {
            innerHtml += "<option value='" + i + "'>" + i + "</option>";
            innerHtml += "<option value='" + i + ":30'>" + i + ":30</option>";
        }
        innerHtml += "</select><input ";
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


    var innerHtml = "<select onchange='check()'><option value='null' selected></option>";
    // if the hour scheme is 12

    if (document.getElementById("eventHour").value != "24") {
        // get the start value and make it into a number
        var start_time = send.value;
        var new_start = parseInt(start_time);
        // if necessary, make some additions
        if (start_time.indexOf(":") == -1) {
            innerHtml += "<option value='" + start_time + ":30'>" + start_time + ":30</option>";
            // anticipate weird US time naming conventions 12AM-12:30AM-1AM
            if (new_start == 12) {
                new_start = 0;
            }
        }
        for (i = new_start + 1; i <= 11; i += 1) {
            innerHtml += "<option value='" + i + "'>" + i + "</option>";
            innerHtml += "<option value='" + i + ":30'>" + i + ":30</option>";
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
    window.eventArray = [];
    window.name = document.getElementById("eventName").value;
    window.month = document.getElementById("eventMonth").value;
    window.day = document.getElementById("eventDay").value;
    window.hour = document.getElementById("eventHour").value;
    window.timeStart = document.getElementById("eventStart").value;
    window.timeEnd = document.getElementById("eventEnd").value;
    var eventObj = {
        name: window.name,
        month: window.month,
        day: window.day
    };
    window.alert("New event Created with Name: "+ name);
    window.alert(JSON.stringify(obj));
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
      newDiv.setAttribute("boxindex", numBoxes.toString());
      var innerHtml = "<select onchange='check()'><option value='null' selected></option>";
      newDiv.innerHTML = innerHtml;
      endDiv.appendChild(newDiv);
  }
});

export default Component.extend({
  tag: 'adminComponent-',
  ViewModel,
  view
});

