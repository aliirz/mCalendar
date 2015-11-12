Meteor.startup(function () {
  Meteor.methods({
    'saveCalEvent': function (ce) {
      Events.insert(ce);
    }
  })
})
