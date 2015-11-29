import E  from 'ember';
import DS from 'ember-data';

import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  title: validator('presence', {
    presence: true,
    message: 'Заголовок должен присутствовать.'
  }),

  id: [
    validator('presence', {
      presence: true,
      message: 'ID должен присутствовать.'
    }),
    validator(function(value, options, model/*, attribute*/) {
      return !model
        .get('store')
        .peekAll('event')
        .filter(ti => ti !== model && !ti.get('isDeleted') && !ti.get('isDeleting'))
        .mapBy('id')
        .contains(value) || 'Id должен быть уникален.';
    })
  ]
});


export default DS.Model.extend(Validations, {
  date:  DS.attr('date', {defaultValue: () => new Date()}),

  hour:   DS.attr('number', {defaultValue: 19}),
  minute: DS.attr('number', {defaultValue: 0}),

  title: DS.attr('string'),
  body:  DS.attr('string')
});
