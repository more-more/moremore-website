import DS   from 'ember-data';
import _    from 'lodash/lodash';
import FM   from 'npm:front-matter';
import Yaml from 'npm:yamljs';

export default DS.JSONAPISerializer.extend({
  normalizeResponse (store, model, payload, id, requestType) {

    if (!payload || !payload.files) { return payload; }

    const records =
      _(payload.files)
        .filter((data, name) => _.startsWith(name, 'model.'))
        .map(data => {
          const [foo, type, id] = data.filename.split('.');
          const frontmatter = FM(data.content);

          const attrs =
              _(frontmatter.attributes.attributes)
                .mapKeys((value, key) => key.camelize())
                .merge({ body: frontmatter.body })
                .value();

          const relationships = _.merge({}, frontmatter.attributes.relationships);

          return {
            type:          type,
            id:            id,
            attributes:    attrs,
            relationships: relationships
          }
        })
        .value();

    let data, included;

    if (requestType === 'deleteRecord') {
      return {meta: {}};
    }

    if (['createRecord', 'updateRecord', 'findRecord'].contains(requestType)) {
      [[data], included] = _.partition(records, r => r.id === id);

    } else {
      [data, included] = _.partition(records, r => r.type === (model && model.modelName));
    }

    return {
      data:     data,
      included: included
    }
  },

  serialize (snaphot, options) {
    const {data: json} = this._super(snaphot, options);

    const id   = json.id;
    const type = json.type.singularize();
    const body = json.attributes.body;

    delete json.id;
    delete json.type;
    delete json.attributes.body;

    const yaml = Yaml.stringify(json);

    let result = `---\n${yaml}---`;

    if (body) {
      result += `\n${body}`;
    }

    return {
      name:    `model.${type}.${id}.md`,
      content: result
    };
  },

  pushPayload(store, rawPayload) {
    const normalizedPayload = this.normalizeResponse(store, null, rawPayload)
    store.push(normalizedPayload);
  }
});
