import DefineMap from 'can-define/map/';
import route from 'can-route';
import 'can-route-pushstate';
import 'can-stache-bindings';

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
      //Event Class Definition
      //TODO: UI for:
       //                     Name(), Time(), Availability()
       //
      var event = (function() {
        //"private variables" for new event objects
        var eventName, eventAttendees, eventAvailability, eventTime;

        // class "constructor"
        function event(newEventName) {
          eventName = newEventName;
        };

        //adding methods to prototype so all event instances access
        //private methods
        event.prototype.getName = function() {
          return this.eventName;
        };
        event.prototype.getAttendees = function() {
          return this.eventAttendees;
        };

        event.prototype.getTime = function() {
          return this.eventTime;
        };

        event.prototype.getAvailability = function() {
          return this.eventAvailability;
        };

        event.prototype.setName = function() {
          this.eventName = name();
        };

        event.prototype.setAttendees = function() {
          this.eventAttendees = Attendees();
        };

        event.prototype.setTime = function() {
          this.eventTime = Time();
        };

        event.prototype.setAvailability = function() {
          this.eventAvailability = Availability();
        };
        return event;
      })();

      export default AppViewModel;
