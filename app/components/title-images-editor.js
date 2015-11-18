import E from 'ember';
import _ from 'lodash';

export default E.Component.extend({

  // ----- Arguments -----
  titleImages: null,

  // ----- Services -----
  gistSaver: E.inject.service(),
  store:     E.inject.service(),

  // ----- Overridden properties -----
  classNames: 'titleImagesEditor',

  // ----- Static properties -----

  // ----- Computed properties -----
  newTitleImage: E.computed(function() {
    return this.produceNewTitleImage();
  }),

  filteredTitleImages:    E.computed(
    'titleImages.@each.isNew',
    'titleImages.@each.isDeleted',
    function() {
      const titleImages = this.get('titleImages');

      if (!titleImages) { return titleImages; }

      return titleImages.filter((ti) => {
        return !ti.get('isNew') && !ti.get('isDeleted');
      });
    }
  ),
  sortedTitleImagesOrder: ['position', 'imageUrl'],
  sortedTitleImages:      E.computed.sort('filteredTitleImages', 'sortedTitleImagesOrder'),
  dirtyTitleImages:       E.computed.filterBy('filteredTitleImages', 'hasDirtyAttributes', true),

  // ----- Methods -----
  tetherPosition () {
    Ember.run.schedule('afterRender', function () {
      Tether.position();
    });
  },

  produceNewTitleImage () {
    return this.get('store').createRecord('title-image', {
      position: this.get('filteredTitleImages.length')
    });
  },

  // ----- Actions -----
  actions: {
    add (buttonPromiseAcceptor) {
      const savePromise =
        this
          .get('newTitleImage')
          .save()
          .then(() => {
            console.log('foo')
            this.tetherPosition();
            this.set('newTitleImage', this.produceNewTitleImage());
          });

      //buttonPromiseAcceptor(savePromise)
    },

    destroy (buttonPromiseAcceptor, image) {
      const destroyPromise =
        image
          .destroyRecord()
          .then(() => {
            this.tetherPosition();
          });
      //buttonPromiseAcceptor(destroyPromise);
    },

    reorder (itemModels/*, draggedModel*/) {
      itemModels.forEach((r, i) => {
        r.set('position', i);
      });
    },

    save (buttonPromiseAcceptor) {
      const savePromise = this.get('gistSaver').batchSave(this.get('dirtyTitleImages'));
      //buttonPromiseAcceptor(savePromise);
    }
  }
});
