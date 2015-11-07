import DS  from 'ember-data';
import _   from 'lodash/lodash';
import FM  from 'npm:front-matter';

export default DS.Serializer.extend({
  normalizeResponse (store, model, payload, id, requestType) {
    console.log('foo');
    const records =
      _(payload.files)
        .filter((data, name) => _.startsWith(name, 'model.'))
        .map(data => {
          const [foo, type, id] = data.filename.split('.');
          const frontmatter = FM(data.content);

          const attrs =
            _.merge(
              {},
              frontmatter.attributes.attributes,
              { body: frontmatter.body }
            );

          const relationships = _.merge({}, frontmatter.attributes.relationships);

          return {
            type:          type,
            id:            id,
            attributes:    attrs,
            relationships: relationships
          }
        })
        .value();

    const [data, included] = _.partition(records, r => r.type === model.modelName);

    return {
      data:     data,
      included: included
    }
  }
});
