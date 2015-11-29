import E from 'ember';

export default E.Component.extend({

  // ----- Arguments -----
  blocks: null,

  // ----- Services -----
  gistSaver: E.inject.service(),

  // ----- Overridden properties -----
  classNames: 'blockGroupEditor',

  // ----- Computed properties -----
  dirtyBlocks: E.computed.filterBy('blocks', 'hasDirtyAttributes', true),

  cantSave: E.computed('dirtyBlocks.[]', function() {
    return !this.get('dirtyBlocks.length');
  }),

  // ----- Actions -----
  actions: {
    reorder (itemModels/*, draggedModel*/) {
      itemModels.forEach((r, i) => {
        r.set('position', i);
      });
    },

    save (buttonPromiseAcceptor) {
      const savePromise = this.get('gistSaver').batchSave(this.get('dirtyBlocks'));
      buttonPromiseAcceptor(savePromise);
    }
  }
});
