import DS from 'ember-data';
import E  from 'ember';

import config from 'moremore-website/config/environment';

export default DS.RESTAdapter.extend({
  config: E.inject.service(),

  host: E.computed.alias('config.githubApiUrl'),

  headers: E.computed('session.token', function() {
    const token  = this.get('session.token') || config.TMP_TORII_TOKEN;

    return {
      Accept:        'application/vnd.github.v3+json',
      Authorization: token ? `token ${token}` : undefined
    };
  }),

  shouldReloadAll()    { return true; },
  shouldReloadRecord() { return true; }

});
