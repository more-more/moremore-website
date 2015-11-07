import E from   'ember';
import DS from 'ember-data';
import { request } from 'ic-ajax';

export default DS.Adapter.extend({
  gistId: null,

  url: E.computed('gistId', function() {
    const gistId = this.get('gistId');
    return `https://api.github.com/gists/${gistId}`;
  }),

  findAll () {
    return request(this.get('url'));
  }
});
