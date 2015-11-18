import Ember from 'ember';

const {
  computed: {
    alias
  },
  inject: {
    controller
  }
} = Ember;

export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
  Ember.Controller.reopen({

    applicationController: controller('application'),
    _currentRouteName:     alias('applicationController.currentRouteName'),
    _mainMenuItems:        alias('applicationController.mainMenuItems'),

    actions: {
      transitionTo (...args) {
        this.get('target').send('transitionTo', ...args);
      },
      signInViaGithub (...args) {
        this.get('target').send('signInViaGithub', ...args);
      },
      signOut (...args) {
        this.get('target').send('signOut', ...args);
      }
    }
  });
}

export default {
  name:       'controller',
  initialize: initialize
};
