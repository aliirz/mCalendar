Template.fullCalendar.rendered = function(){
   var calendar = $('#calendar').fullCalendar({
       dayClick:function(date,allDay,jsEvent,view){
         var calendarEvent = {};
         calendarEvent.start = date;
         calendarEvent.end = date;
         calendarEvent.title = '';
         calendarEvent.owner = Meteor.userId();

         // Based on Blaze.renderViewwithData, we can pass in an object to bind with the template.
         Modal.show('calModal', calendarEvent);
       },
       eventClick:function(calEvent,jsEvent,view) {
         Modal.show('editModal',calEvent);
         return false;
        //  Session.set('editing_event',calEvent._id);
        //  $('#title').val(calEvent.title);
       },
       eventDrop:function(reqEvent){
        //  Meteor.call('moveEvent',reqEvent);
       },
       events:function(start,end,callback){
         var calEvents = Events.find({},{reactive:false}).fetch();
         callback(calEvents);
       },
       editable:true,
       selectable:true
   }).data().fullCalendar;
   Deps.autorun(function(){
     Events.find().fetch();
     if(calendar){
       calendar.refetchEvents();
     }
   })
 }
