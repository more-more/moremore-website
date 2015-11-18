import E from 'ember';

export default E.Service.extend({
  gistId:       '232a9453b04988bdc060',
  githubApiUrl: 'https://api.github.com',

  gistUrl: E.computed('gistId', 'githubApiUrl', function() {
    const gistId       = this.get('gistId');
    const githubApiUrl = this.get('githubApiUrl');
    return `${githubApiUrl}/gists/${gistId}`;
  })
});
