// This all happens when the calender template gets rendered
Template.fullCalendar.rendered = function(){
   var calendar = $('#calendar').fullCalendar({

        //Occurs when a empty day is clicked
       dayClick:function(date,allDay,jsEvent,view){
         var calendarEvent = {};
         calendarEvent.start = date;
         calendarEvent.end = date;
         calendarEvent.title = '';
         calendarEvent.owner = Meteor.userId();

         // Based on Blaze.renderViewwithData, we can pass in an object to bind with the template.
         Modal.show('calModal', calendarEvent);
       },

       // hapens only when an event is clicked
       eventClick:function(calEvent,jsEvent,view) {
         Modal.show('editModal',calEvent);
         return false;

       },

       // Happesnw when an event is dropped
       eventDrop:function(reqEvent){
         Meteor.call('moveEvent',reqEvent);
       },

       // Fetches the events from the collection
       events:function(start,end,callback){
         var calEvents = Events.find({},{reactive:false}).fetch();
         callback(calEvents);
       },
       editable:true,
       selectable:true
   }).data().fullCalendar;
   // This part makes the calendar reactive to the changes in the collection
   Deps.autorun(function(){
     Events.find().fetch();
     if(calendar){
       calendar.refetchEvents();
     }
   })
 }
