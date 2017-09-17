import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './admin.less';
import view from './admin.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the admin component'
  }
});

export default Component.extend({
  tag: 'admin',
  ViewModel,
  view
});
