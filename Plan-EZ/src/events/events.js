import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './events.less';
import view from './events.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the eventComponent component'
  }
});

export default Component.extend({
  tag: 'eventComponent',
  ViewModel,
  view
});
