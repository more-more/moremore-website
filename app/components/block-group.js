import E from 'ember';
import { filterFromCollectionByKey } from 'ember-macaroni';

export default E.Component.extend({

  // ----- Arguments -----
  group:  null,
  blocks: null,

  // ----- Services -----
  session: E.inject.service(),

  // ----- Overridden properties -----
  classNames: 'blockGroup',

  // ----- Static properties -----
  isEditing:    false,

  // ----- Computed properties -----
  myBlocks:     filterFromCollectionByKey('blocks', 'group', 'group'),
  sortedBlocks: E.computed('myBlocks.@each.position', function () {
    return this
      .get('myBlocks')
      .sortBy('position');
  }),

  // ----- Actions -----
  actions: {
    toggleEdit () {
      this.toggleProperty('isEditing');
    }
  }
});
