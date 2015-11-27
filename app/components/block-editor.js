import E from 'ember';

export default E.Component.extend({

  // ----- Arguments -----
  block: null,

  // ----- Services -----
  store: E.inject.service(),

  // ----- Static properties -----
  newGroup: E.computed('block.group', function() {
    return this.get('block.group');
  }),

  // ----- Computed properties -----
  blocks: E.computed(function () {
    return this
      .get('store')
      .peekAll('block');
  }),

  groups: E.computed('blocks.@each.group', function () {
    return this
      .get('blocks')
      .mapBy('group')
      .uniq();
  }),

  isClean: E.computed(
    'block.hasDirtyAttributes',
    'newGroup',
    function () {
      return (
        !this.get('block.hasDirtyAttributes')
        && this.get('newGroup') === this.get('block.group')
      );
    }
  ),

  // ----- Actions -----
  actions: {
    changeGroup (group) {
      this.set('newGroup', group);
    },

    save (buttonPromiseAcceptor) {
      const newGroup     = this.get('newGroup');
      const currentGroup = this.get('block.group');
      if (newGroup !== currentGroup) {
        this.set('block.group', newGroup);
      }
      const savePromise = this.get('block').save();
      buttonPromiseAcceptor(savePromise);
    }
  }
});
