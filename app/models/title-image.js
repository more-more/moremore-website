import E  from 'ember';
import DS from 'ember-data';

import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  imageUrl: validator('presence', true),
  //position: [
  //  validator('presence', true),
  //  validator(function(value, options, model/*, attribute*/) {
  //    return !model
  //      .get('store')
  //      .peekAll('title-image')
  //      .filter(ti => ti !== model && !ti.get('isDeleted') && !ti.get('isDeleting'))
  //      .mapBy('position')
  //      .contains(value) || 'Position should be unique.';
  //  })
  //],
  id: [
    validator('presence', true),
    validator(function(value, options, model/*, attribute*/) {
      return !model
        .get('store')
        .peekAll('title-image')
        .filter(ti => ti !== model && !ti.get('isDeleted') && !ti.get('isDeleting'))
        .mapBy('id')
        .contains(value) || 'Id should be unique.';
    })
  ]
});

export default DS.Model.extend(Validations, {

  // ----- Attributes -----
  imageUrl: DS.attr('string'),
  position: DS.attr('number')
});
