import DS from 'ember-data';

export default DS.Model.extend({
  imageUrl: DS.attr('string'),
  position: DS.attr('number')
});
