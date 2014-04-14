App.CandidatesController = Ember.ArrayController.extend({
  actions: {
    createCandidate: function() {
      var name = this.get('new_name')
        , degree = this.get('new_degree')
        , place = this.get('new_place')
        , heading = this.get('new_heading');

      if(!name.trim() || !place.trim() || !degree.trim() || !heading.trim()) { return; }

      var candidate = this.store.createRecord('candidate', {
        name: name,
        degree: degree,
        place: place,
        heading: heading
      });

      this.set('new_name', '');
      this.set('new_place', '');
      this.set('new_degree', '');
      this.set('new_heading', '');

      candidate.save();
    }
  }
});


App.CandidateController = Ember.ObjectController.extend({
  isEditing: false,

  actions: {
    edit: function() {
      this.set('isEditing', true);
    },
    doneEditing: function() {
      this.get('model').save();
      this.set('isEditing', false);
    }
  }
});
