import E from 'ember';

export default E.Component.extend({

  // ----- Arguments -----

  // ----- Overridden properties -----
  classNames: 'eventAdder',

  // ----- Services -----
  store: E.inject.service(),

  // ----- Computed properties -----
  newEvent: E.computed(function() {
    return this.produceNewEvent();
  }),

  cantSave:    E.computed('newEvent.validations.isTruelyValid', function() {
    return !this.get('newEvent.validations.isTruelyValid');
  }),

  // ----- Methods -----
  tetherPosition () {
    Ember.run.schedule('afterRender', function () {
      Tether.position();
    });
  },

  produceNewEvent () {
    return this.get('store').createRecord('event', {
    });
  },

  // ----- Observers -----
  triggerTetherPosition: E.observer(
    'newTitleImage.id',
    'newTitleImage.imageUrl',
    function () {
      this.tetherPosition();
    }
  ),

  // ----- Actions -----
  actions: {
    save (buttonPromiseAcceptor) {
      if (this.get('cantSave')) {
        buttonPromiseAcceptor(E.RSVP.reject());
        return;
      }

      const savePromise =
        this
          .get('newEvent')
          .save()
          .then(result => {
            this.set('newEvent', this.produceNewEvent());
            return result;
          });

      buttonPromiseAcceptor(savePromise);
    }
  }

});
