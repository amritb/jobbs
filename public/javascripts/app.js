App = Ember.Application.create();

App.Router.map(function(){
  this.route('index', { path: '/' });
  this.route('term', { path: '/:term' });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return data.map(function(item){
      item.description = decodeURI(item.description);
      return item;
    });
  }
});

App.TermRoute = Ember.Route.extend({
  model: function(params){
    var filtered = data.filter(function(item) {
      return item.title.toLowerCase().indexOf(params.term.toLowerCase()) !== -1 || item.description.toLowerCase().indexOf(params.term.toLowerCase()) !== -1;
    });
    return filtered.map(function(item){
      item.description = decodeURI(item.description);
      return item;
    });
  },

  renderTemplate: function() {
    this.render('index');
  }
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});


App.TermView = App.IndexView = Ember.View.extend({
  didInsertElement: function() {
    this._super();
    Ember.run.scheduleOnce('afterRender', this, function() {
      $('h2.title').click(function(){
        $(this).parent().find('.description').slideToggle('fast');
      });
    });
  }
});
