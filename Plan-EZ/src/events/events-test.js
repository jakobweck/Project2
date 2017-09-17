import QUnit from 'steal-qunit';
import { ViewModel } from './events';

// ViewModel unit tests
QUnit.module('plan-ez/events');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the eventComponent component');
});
