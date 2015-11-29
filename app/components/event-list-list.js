import E from 'ember';
import _ from 'lodash';

export default E.Component.extend({

  // ----- Arguments -----
  events: null,

  // ----- Overridden properties -----
  classNames: 'eventListList',

  // ----- Computed properties -----
  groupedEvents: E.computed(
    'events.@each.date',
    function () {
      return this.groupEvents(this.get('events'));
    }
  ),

  groupedEventsSortedKeys: E.computed(
    'groupedEvents',
    function () {
      return Object
        .keys(this.get('groupedEvents'))
        .sort((a, b) => a - b);
    }
  ),

  // ----- Methods -----
  groupEvents (events) {
    return _
      .groupBy(
        events.toArray().sortBy('hour', 'minute'),
        e => moment(e.get('date')).startOf('day').format('x')
      );
  },

});
