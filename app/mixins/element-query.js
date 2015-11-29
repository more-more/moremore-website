import E from 'ember';

export default E.Mixin.create({
  // ----- Events -----
  refreshElementQuery: E.on('didInsertElement', function () {
    window.eqjs.refreshNodes();
    window.eqjs.query();
  })
});
