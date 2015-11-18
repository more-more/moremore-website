import GithubAdapter from 'moremore-website/adapters/github';

export default GithubAdapter.extend({
  urlForFindRecord: function(id, typeKey) {
    if( id === 'current' ) {
      const url = this._buildURL(typeKey);
      return url.substring(0, url.length-1);
    }

    return this._buildURL(typeKey, id);
  }
});
