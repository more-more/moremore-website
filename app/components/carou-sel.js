import E from 'ember';

export default E.Component.extend({

  // Arguments
  titleImages: null,


  // ----- Services -----
  session: E.inject.service(),


  // Overridden properties
  classNameBindings: [':carouSel'],


  // ----- Static properties -----
  isEditing: false,


  // Computed properties
  filteredImages:    E.computed(
    'titleImages.@each.isDeleting',
    'titleImages.@each.isDeleted',
    'titleImages.@each.isNew',
    function () {
      return this
        .get('titleImages')
        .filter(ti => !ti.get('isNew') &&!ti.get('isDeleting') && !ti.get('isDeleted'));
    }
  ),
  sortedImages:      E.computed.sort('filteredImages', 'sortedImagesOrder'),
  sortedImagesOrder: ['position:asc'],

  currentImage: E.computed(
    'sortedImages.[]',
    function() {
      return this.get('sortedImages.firstObject');
    }
  ),


  // Observers
  preloadImages: E.on('init', E.observer(
    'sortedImages.@each.imageUrl',
    function () {
      this
        .get('sortedImages')
        .mapBy('imageUrl')
        .forEach(imageUrl => (new Image).src = imageUrl);
    }
  )),


  // Actions
  actions: {
    next () {
      const currentImage = this.get('currentImage');
      const images       = this.get('sortedImages');
      const currentIndex = images.indexOf(currentImage);

      let nextIndex = currentIndex + 1;
      if (nextIndex === images.length) { nextIndex = 0; }

      const nextImage = images.objectAt(nextIndex);
      this.set('currentImage', nextImage);
    },

    prev () {
      const currentImage = this.get('currentImage');
      const images       = this.get('sortedImages');
      const currentIndex = images.indexOf(currentImage);

      let prevIndex = currentIndex - 1;
      if (prevIndex < 0 ) { prevIndex = images.length - 1; }

      const prevImage = images.objectAt(prevIndex);
      this.set('currentImage', prevImage);
    },

    toggleEdit () {
      this.toggleProperty('isEditing');
    }
  }

});
