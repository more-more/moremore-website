import Ember from 'ember';

export default Ember.Component.extend({

  // ----- Arguments -----
  model: null,
  key:   null,
  label: null,

  // ----- Overridden properties -----
  classNames: ['modelField']
});
