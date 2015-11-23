import Ember from 'ember';

export default Ember.Route.extend({

  actions: {

    signInViaGithub () {
      console.log('session', this.session)
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
          blockGroups: this.store.peekAll('block-group'),

          blockGroupCallout: this.store.peekRecord('block-group', 'callout'),
          blockGroupFooter:  this.store.peekRecord('block-group', 'footer'),
        };
      });
  }
});
