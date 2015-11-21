import Ember from 'ember';

export default Ember.Component.extend({

  // ----- Arguments -----
  model: null,
  key:   null,
  value: null,
  label: null,

  // ----- Overridden properties -----
  classNames: ['modelFieldInput']
});
