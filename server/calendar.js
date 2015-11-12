// Server side events for CRUD

Meteor.startup(function () {
  Meteor.methods({

    // Plain and simple save an event
    'saveCalEvent': function (ce) {
      Events.insert(ce);
    },

    //update an event
    'updateCalEvent' : function (id, ce) {
      return Events.update({_id: id}, ce);
    },

    //delete an event
    'removeCalEvent' : function(id) {
      return Events.remove(id);
    },

    // drag and drop an event
    'moveEvent':function(reqEvent){
      return Events.update({_id:reqEvent._id},{
        $set:{
          start:reqEvent.start,
          end:reqEvent.end
        }
      })
    }
  });
});
