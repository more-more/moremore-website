import E           from 'ember';
import { request } from 'ic-ajax';

export default E.Service.extend({
  config:  E.inject.service(),
  session: E.inject.service(),
  store:   E.inject.service(),

  serializeRecords (records) {
    return records
        .map(r => {
          return r.serialize({includeId: true});
        })
        .reduce((result, {name, content}) => {
          result[name] = {
            content: content
          };
          return result;
        }, {});
  },

  batchSave (records) {
    const serializedRecords = this.serializeRecords(records);
    const store             = this.get('store');
    console.log('serializedRecords', serializedRecords)

    return request({
      url: this.get('config.gistUrl'),
      type: 'PATCH',
      contentType: 'text/plain',
      data: JSON.stringify({files: serializedRecords}),
      headers: {
        Accept:        'application/vnd.github.v3+json',
        Authorization: `token ${this.get('session.token')}`
      }
    })
      .then((response) => {
        console.log('response', response);
        console.log('records', records.length, records);
        store.pushPayload(response);
        return E.RSVP.all(
          records.map(r => {
            r.save({adapterOptions: {dontPersist: true}});
          })
        );
      })
      .then(() => records);
  }
});
