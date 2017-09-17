import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './events.less';
import view from './events.stache';



export const ViewModel = DefineMap.extend({
  page: 'Event List'
  title: {
    value: 'Event Page'
  }
  name: {
    value: 'Event name here'
  },
  date: {
    value: 'Date here'
  },
  time: {
    value: 'Time here'
  },
});

export default Component.extend({
  tag: 'eventComponent',
  ViewModel,
  view
});
