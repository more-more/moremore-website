import E from 'ember';

export default E.Component.extend({

  // ----- Arguments -----
  block: null,


  // ----- Services -----
  session: E.inject.service(),


  // ----- Static properties -----
  isEditing: false,


  // ----- Actions -----
  actions: {
    toggleEdit () {
      this.toggleProperty('isEditing');
    }
  }
});
