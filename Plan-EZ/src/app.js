import DefineMap from 'can-define/map/';
import route from 'can-route';
import 'can-route-pushstate';
import 'can-stache-bindings';


function event(name, time) {
  //"private variables" for new event objects
  //var eventName, m_eventAttendees, m_eventAvailability, m_eventTime;
  // class "constructor"
    this.name = name;
    this.time = time;
  }
  event.prototype.getName = function(){
    return this.eventName;
  }
  event.prototype.getTime = function(){
    return this.eventTime;
  };

const AppViewModel = DefineMap.extend({
      message: {
        value: 'Welcome to our easy event planner!',
        serialize: false
      },
      // initializing variables as global variables
      newEvent() {
        window.name = document.getElementById("eventName").value;
        window.month = document.getElementById("eventMonth").value;
        window.day = document.getElementById("eventDay").value;
        window.timeStart = document.getElementById("eventStart").value;
        window.timeEnd = document.getElementById("eventEnd").value;
      },
      // test function for global variables
      printItems () {
        console.log(name);
        console.log(month);
        console.log(day);
        console.log(timeStart);
        console.log(timeEnd);
      },
      //Function for taking event data and creating a new event object with that data
      createEventObject(){
        //var myEvent = new event(name,(timeStart-timeEnd));
        console.log("message");
      },

      title: {
        value: 'Plan-EZ',
        serialize: false
      },
    });
        var timeSet = (function() {

            // private variables
            var month, day, time;

            // class "constructor"
            function time(eventMonth,eventDay,eventTimes) {
              month = eventMonth;
              day = eventDay;
              time = eventTimes;
            };

            // member methods
            // TODO: match preference with setting function? not sure how the
            //       UI handles the interaction
            time.prototype.getMonth = function() {
              return this.month;
            };

            time.prototype.setMonth = function(newMonth) {
              this.month = newMonth;
            };

            time.prototype.getDay = function() {
              return this.day;
            };

            time.prototype.setDay = function(newDay) {
              this.day = newDay;
            };

            time.prototype.getTime = function() {
              return this.time;
            };

            time.prototype.setTime = function(newTime) {
              this.time = newTime;
            };

            return timeSet;

          })();
      // //Event Class Definition
      // //TODO: UI for:
      //  //                     Name(), Time(), Availability()
      //  //
      // class event {
      //   //"private variables" for new event objects
      //   //var eventName, m_eventAttendees, m_eventAvailability, m_eventTime;
      //   // class "constructor"
      //   constructor(newEventName,newEventTime) {
      //     this.eventName = newEventName;
      //     this.eventTime = newEventTime;
      //   };
      //   get name(){
      //     return this.eventName;
      //   }
      //   get time(){
      //     return this.eventTime;
      //   }
      // };

      export default AppViewModel;
