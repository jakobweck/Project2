import F from 'funcunit';
import QUnit from 'steal-qunit';

import 'plan-ez/models/test';

import 'plan-ez/events/events-test';

F.attach(QUnit);

QUnit.module('plan-ez functional smoke test', {
  beforeEach() {
    F.open('./development.html');
  }
});

QUnit.test('plan-ez main page shows up', function() {
  F('title').text('plan-ez', 'Title is set');
});
