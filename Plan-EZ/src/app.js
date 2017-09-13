import DefineMap from 'can-define/map/';
import route from 'can-route';
import 'can-route-pushstate';

const AppViewModel = DefineMap.extend({
  message: {
    value: 'Welcome to our easy event planner!',
    serialize: false
  },
  Name () {
    eventName = promt("Please enter the name of your event", "Event name...");
    return (eventName);
  },
  title: {
    value: 'Plan-EZ',
    serialize: false
  }
  
class event(){
  constructor(name, attendees, time, availability){
    this.name = name;
    this.attendees = attendees;
    this.time = time;
    this.availability = availability;
  }
  getName(){
    return this.name;
  }
  getAttendees(){
    return this.attendees;
  }
  getTime(){
    return this.time;
  }
  getAvailability(){
    return this.availability;
  }
  setName(){
    name = Name();
  }
  setAttendees(){
    attendees = Attendees();
  }
  setTime(){
    time = Time();
  }
  setAvailability(){
    availability = Availability();
  }

}

});

export default AppViewModel;
