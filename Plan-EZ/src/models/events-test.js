import QUnit from 'steal-qunit';
import Events from './events';

QUnit.module('models/events');

QUnit.test('getList', function(){
  stop();
  Events.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.item(0).description, 'First item');
    start();
  });
});
