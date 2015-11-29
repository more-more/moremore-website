import E      from 'ember';
import moment from 'moment';

export default E.Component.extend({

  // ----- Attributes -----
  events: null,

  // ----- Services -----
  session: E.inject.service(),
  time:    E.inject.service(),

  // ----- Overridden properties -----
  classNames: 'eventList',

  // ----- Static properties -----
  isAddingEvent: false,

  // ----- Computed properties -----
  filteredEvents: E.computed(
    'events.@each.isNew',
    function () {
      return this
        .get('events')
        .filter(e => !e.get('isNew'));
    }
  ),

  upcomingEvents: E.computed(
    'filteredEvents.@each.date',
    'startDate',
    function () {
      const startDate = this.get('startDate');
      return this
        .get('filteredEvents')
        .filter(e => e.get('date') >= startDate);
    }
  ),

  archivedEvents: E.computed(
    'filteredEvents.@each.date',
    'startDate',
    function () {
      const startDate = this.get('startDate');
      return this
        .get('filteredEvents')
        .filter(e => e.get('date') < startDate);
    }
  ),

  startDate: E.computed(
    'time.time',
    function () {
      return moment(this.get('time.time'))
        .startOf('day')
        .toDate();
    }
  ),

  // ----- Actions -----
  actions: {
    toggleAddingEvent () {
      this.toggleProperty('isAddingEvent')
    }
  }

});
