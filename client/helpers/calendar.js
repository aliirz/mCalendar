Template.calendar.helpers({
  events: function () {
    var fc = $('.fc');
    return function (start, end, tz, callback) {
      //subscribe only to specified date range
      Meteor.subscribe('events', start.toDate(), end.toDate(), function () {
        //trigger event rendering when collection is downloaded
        fc.fullCalendar('refetchEvents');
      });

      //find all, because we've already subscribed to a specific range
      var events = Events.find().map(function (it) {
        return {
          title: it.date.toISOString(),
          start: it.date,
          allDay: true
        };
      });
      callback(events);
    };
  },
  onDayClick: function() {
    return function(date, jsEvent, view) {
      // console.log("Event clicked: " + date);
      var calendarEvent = {};
       calendarEvent.start = date;
       calendarEvent.end = date;
       calendarEvent.title = 'New Event';
       calendarEvent.owner = Meteor.userId();
      Modal.show('calModal', calendarEvent);
    }
  }
});
