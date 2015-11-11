Template.calendar.helpers({
    onDayClick: function() {
      return function(date, jsEvent, view) {
          console.log("Event clicked: " + date);
      }
    }
});
