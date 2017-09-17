import fixture from 'can-fixture';
import Events from '../events';

const store = fixture.store([{
  id: 0,
  description: 'First item'
}, {
  id: 1,
  description: 'Second item'
}], Events.connection.algebra);

fixture('/api/{id}', store);

export default store;
