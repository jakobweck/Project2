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
  }
  title: {
    value: 'Plan-EZ',
    serialize: false
  }
});

export default AppViewModel;
