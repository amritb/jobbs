App = Ember.Application.create();

App.Router.map(function() {
  this.resource('candidates', function() {});
  this.resource('candidate', { path: '/candidate/:candidate_id' });

  this.resource('jobs', function() {});

  this.resource('companies', function() {});
});

// CANDIDATES ==================================================================

App.CandidatesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('candidate');
  }
});

App.CandidateRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('candidate', params.candidate_id);
  }
})
