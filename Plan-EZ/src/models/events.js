import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import set from 'can-set';
import superMap from 'can-connect/can/super-map/';
import loader from '@loader';

const Events = DefineMap.extend({
  seal: false
}, {
  'id': 'any',
  name: 'string',
  month: 'string',
  day: 'string',
  timeStart: 'string',
  timeEnd: 'string',
  attendees: 'string'
});

const algebra = new set.Algebra(
  set.props.id('id')
);

Events.List = DefineList.extend({
  '#': Events
});

Events.connection = superMap({
  url: loader.serviceBaseURL + '/api',
  Map: Events,
  List: Events.List,
  name: 'events',
  algebra
});

export default Events;
