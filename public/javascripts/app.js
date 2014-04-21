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
    var jobs = this.store.find('job');
    return [{title: params.term, description: 'desc'}];
    /*var filtered = data.filter(function(item) {
      return item.title.toLowerCase().indexOf(params.term.toLowerCase()) !== -1 || item.description.toLowerCase().indexOf(params.term.toLowerCase()) !== -1;
    });
    return filtered;*/
    /*
    return filtered.map(function(item){
      console.log(item);
      // item.set('description', decodeURI(item.description));
      return item;
    });*/
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

/*
App.TermView = App.IndexView = Ember.View.extend({
  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      $('h2.title').click(function(){
        console.log('clicked');
        $(this).parent().find('.description').slideToggle('fast');
      });
    });
  }
});
*/

App.ClickableView = Ember.View.extend({
  click: function(evt) {
    var elem = this.get('element');
    console.log(elem);
    $(elem).parent().find('.description').slideToggle('fast');
  }
});
