Meteor.startup(function () {
  Meteor.methods({
    'saveCalEvent': function (ce) {
      Events.insert(ce);
    },
    'updateCalEvent' : function (id, ce) {
      return Events.update({_id: id}, ce);
    },
    'removeCalEvent' : function(id) {
      return Events.remove(id);
    },
  });
});
