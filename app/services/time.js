import Ember from 'ember';

import ENV from 'moremore-website/config/environment';

const {
  on,
  run
} = Ember;

export default Ember.Service.extend({
  time:  null,
  tick:  1000,

  getCurrentTime () {
    return new Date();
  },

  updateTime (time = this.getCurrentTime()) {
    return this.set('time', time);
  },

  rockTheClock: on('init', function() {
    this.updateTime();

    if (
      window.testInProgress
      || ENV.environment === 'testing'
      || this.get('isDestroying')
      || this.get('isDestroyed')
    ) {
      return;
    }

    const tick = this.get('tick');

    run.later(this, this.rockTheClock, tick);
  }),

  globalize: on('init', function() {
    if (
      window.testInProgress
      || ENV.environment === 'testing'
    ) {
      window.EmberTimeService = this;
    }
  })
});
