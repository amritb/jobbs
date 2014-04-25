App = Ember.Application.create();
App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Job = DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  link: DS.attr('string'),
  date: DS.attr('date')
});

App.Router.map(function(){
  this.route('term', { path: '/:term' });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('job');
  }
});

App.TermRoute = Ember.Route.extend({
  model: function(params){

    var filtered = App.Job.FIXTURES.filter(function(item) {
      return item.title.toLowerCase().indexOf(params.term.toLowerCase()) !== -1 || item.description.toLowerCase().indexOf(params.term.toLowerCase()) !== -1;
    });
    // return filtered;

    for (var i = filtered.length - 1; i >= 0; i--) {
      try {
        filtered[i]['description'] = decodeURI(filtered[i]['description']);
      } catch (e) {
        console.log('decodeURI error caught.');
      }
    };
    return filtered;
  }/*,

  renderTemplate: function() {
    this.render('index');
  }*/
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});

Ember.Handlebars.helper('decode-description', function(description) {
  return decodeURI(description);
});

App.ClickableView = Ember.View.extend({
  click: function(evt) {
    var elem = this.get('element');
    $(elem).parent().find('.description').slideToggle('fast');
  }
});
