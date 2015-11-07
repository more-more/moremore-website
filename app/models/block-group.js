import DS from 'ember-data';

export default DS.Model.extend({
  blocks: DS.hasMany('block', {inverse: 'blockGroup'})
});
