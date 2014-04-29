App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  // LOG_TRANSITIONS_INTERNAL: true
});
App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Job = DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  link: DS.attr('string'),
  date: DS.attr('date'),
  description_processed: function() {
    var r = this.get('description');
    try {
      r = decodeURI(r);
    } catch (e) {}
    return r;
  }.property('description')
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

    return this.store.filter('job', function(item){
      // console.log(item.get('title'))
      // return item.get('title').toLowerCase().indexOf(params.term.toLowerCase()) !== -1 || item.get('description_processed').toLowerCase().indexOf(params.term.toLowerCase()) !== -1;
      return true;
    });

    /*
    var filtered = this.store.find('job').filter(function(item) {
      return item.title.toLowerCase().indexOf(params.term.toLowerCase()) !== -1 || item.description.toLowerCase().indexOf(params.term.toLowerCase()) !== -1;
    });
    return filtered;*/
  }
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});

App.ClickableView = Ember.View.extend({
  click: function(evt) {
    var elem = this.get('element');
    $(elem).parent().find('.description').slideToggle('fast');
  }
});
