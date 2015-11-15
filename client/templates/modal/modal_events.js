// All modal button events


Template.calModal.events({

  //Save button for creation of new event
  'click .saveButton' : function (event) {

    // Create a Calendar Event
    var calendarEvent = {};
    calendarEvent.start = $('#dateField').val();
    calendarEvent.end = $('#dateField').val();
    calendarEvent.title =  $('#titleField').val();
    calendarEvent.type = $('#typeField').val();
    calendarEvent.url = $('#fileField').val();
    calendarEvent.manager = $('#pmField').val();
    calendarEvent.transport = $('#transportType option:selected').text();
    calendarEvent.startTime = $('#startTime').val();
    calendarEvent.endTime = $('#endTime').val();

    // Adding user id here
    calendarEvent.owner = Meteor.userId();

    // Save the Event
    Meteor.call('saveCalEvent', calendarEvent);

    // Close the Modal
    Modal.hide();
  }
});


Template.editModal.events({
  'click .saveButton' : function (event) {

    // Create a Calendar Event
    var calendarEvent = {};
    calendarEvent.id = $('#identifierField').val();
    calendarEvent.start = $('#dateField').val();
    calendarEvent.end = $('#dateField').val();
    calendarEvent.title =  $('#titleField').val();
    calendarEvent.type = $('#typeField').val();
    calendarEvent.url = $('#fileField').val();
    calendarEvent.manager = $('#pmField').val();
    calendarEvent.startTime = $('#startTime').val();
    calendarEvent.endTime = $('#endTime').val();
    calendarEvent.transport = $('#transportField').val();

    // Adding user id here
    calendarEvent.owner = Meteor.userId();

    // Save the Event
    Meteor.call('updateCalEvent', calendarEvent.id, calendarEvent);

    // Close the Modal
    Modal.hide();
  },
  'click .deleteButton' : function (event) {

    //Delete the event
    Meteor.call('removeCalEvent',  $('#identifierField').val());

    // hide the modal
    Modal.hide();
  },

  // Send button. NOTE: Twilio needs to be configured in order for this to work.
  'click .smsButton': function (event) {
    var calendarEvent = {};
    calendarEvent.id = $('#identifierField').val();
    calendarEvent.start = $('#dateField').val();
    calendarEvent.end = $('#dateField').val();
    calendarEvent.title =  $('#titleField').val();
    calendarEvent.type = $('#typeField').val();
    calendarEvent.url = $('#fileField').val();
    calendarEvent.manager = $('#pmField').val();
    calendarEvent.startTime = $('#startTime').val();
    calendarEvent.endTime = $('#endTime').val();

    // Adding user id here
    calendarEvent.owner = Meteor.userId();

    //This calls the server side send SMS event.
    Meteor.call('sendSMS', calendarEvent);

    Modal.hide();
  },
});
