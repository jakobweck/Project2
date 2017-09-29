import DefineMap from 'can-define/map/';
import route from 'can-route';
import 'can-route-pushstate';
import 'can-stache-bindings';

const AppViewModel = DefineMap.extend({
      page: 'Login',
      message: {
        value: 'Welcome to our easy event planner!',
        serialize: false
      },
      title: {
        value: 'Plan-EZ',
        serialize: false
      },
    });
window.people = "";
route('/{page}', { page: 'adminList-' });
export default AppViewModel;
