Template.calModal.events({
  'click .saveButton' : function (event) {
    var calendarEvent = {};
       calendarEvent.start = $('#dateField').val();
       calendarEvent.end = $('#dateField').val();
       calendarEvent.title =  $('#titleField').val();
       calendarEvent.type = $('#typeField').val();
       calendarEvent.url = $('#fileField').val();
       calendarEvent.manager = $('#pmField').val();
       calendarEvent.owner = Meteor.userId();
    Meteor.call('saveCalEvent', calendarEvent);
  }
})
