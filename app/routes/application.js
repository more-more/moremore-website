import Ember from 'ember';

export default Ember.Route.extend({

  moment: Ember.inject.service(),

  actions: {

    signInViaGithub () {
      this.session.open('github-oauth2').catch(function (error) {
        alert('Could not sign you in: ' + error.message);
        throw error;
      });
    },

    signOut () {
      this.session.close();
    }
  },

  beforeModel() {
    this.get('moment').changeLocale('ru');

    return this
      .session
      .fetch('github-oauth2')
      .catch(() => {});
  },


  model () {
    return this
      .store
      .findAll('post')
      .then(posts => {
        return {
          posts:       posts,
          titleImages: this.store.peekAll('title-image'),
          blocks:      this.store.peekAll('block'),
          events:      this.store.peekAll('event')
        };
      });
  }
});
