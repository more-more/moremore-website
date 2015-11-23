import Ember from 'ember';

export default Ember.Component.extend({

  // ----- Arguments -----
  block: null,

  // ----- Actions -----
  actions: {
    save (buttonPromiseAcceptor) {
      const savePromise = this.get('block').save();
      buttonPromiseAcceptor(savePromise);
    }
  }
});
