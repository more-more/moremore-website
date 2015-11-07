import Ember from 'ember';

export default Ember.Route.extend({
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

          blockGroupCallout: this.store.peekRecord('block-group', 'callout')
        };
      });
  }
});
