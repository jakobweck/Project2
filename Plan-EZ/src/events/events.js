import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './events.less';
import view from './events.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'Please select your availability for the event below:'
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
