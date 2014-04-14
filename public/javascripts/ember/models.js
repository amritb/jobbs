App.ApplicationAdapter = DS.FixtureAdapter;

/*
App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'candidate'
});
*/

App.Candidate = DS.Model.extend({
  name: DS.attr('string'),
  degree: DS.attr('string'),
  place: DS.attr('string'),
  heading: DS.attr('string')
})

// FIXTURES ====================================================================

App.Candidate.FIXTURES = [{
  id: '1',
  name: 'Sajjad Hyder',
  degree: 'Bachelor of Engineering',
  place: 'Pune',
  heading: 'Experienced content manager'
}, {
  id: '2',
  name: 'Bhushan',
  degree: 'Bachelor of Engineering',
  place: 'Mumbai',
  heading: 'Drupal developer with 1 year of exp'
}]
