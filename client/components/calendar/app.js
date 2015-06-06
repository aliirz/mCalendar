if (!this.App) this.App = {};

Meteor.call('getenv', function(err, env) {
	this.App.env = env;
}.bind(this))

this.App.getEventsData = function() {
  var userId;
  userId = (Meteor.userId() === null ? "" : Meteor.userId());
  return Events.find({$or: [{partnerIds: userId}, {ownerId: userId}]}).fetch();
};

this.App.generateCalendar = function() {
  if(!$('#calendar').children().length) {
    $("#calendar").fullCalendar({
      theme: false,
      header: {
        left: "prev,next today",
        center: "title",
        right: "month,agendaWeek,agendaDay"
      },
      selectable: true,
      selectHelper: true,
      select: function (start, end, jsEvent, view) {
        prepareModal('add', {
          title: '',
          desc: '',
          start: start,
          end: end,
          allDay: !start.hasTime() // use hasTime to check allDay event ref: http://fullcalendar.io/docs/selection/select_callback/
        });
        $("#myModal").modal();
      },
      editable: true,
      events: App.getEventsData(),
      eventClick: function(evt, jsEvt, view) {
        var cacheSource = evt.source;
        delete evt.source;
        prepareModal('edit', evt);
        $("#myModal").modal();
      },
      eventDrop: function( event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
        event.end = event.start.clone().add('hours', 2);
        Events.update({_id: event._id}, {$set: { title: event.title, desc: event.desc, start: event.start.format('ddd MMM DD YYYY HH:mm:ss zZZ'), end: event.end.format('ddd MMM DD YYYY HH:mm:ss zZZ'), allDay: event.allDay}});
      },
      eventResize: function( event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view)  {
        Events.update({_id: event._id}, {$set: { title: event.title, desc: event.desc, start: event.start.format('ddd MMM DD YYYY HH:mm:ss zZZ'), end: event.end.format('ddd MMM DD YYYY HH:mm:ss zZZ'), allDay: event.allDay}});
      }
    });
  } else {
    $("#calendar").fullCalendar("removeEvents");
    $("#calendar").fullCalendar("addEventSource", App.getEventsData());
    $("#calendar").fullCalendar("refetchEvents");
  }
  var viewName = Meteor.user().profile.calendarView || 'month';
  $('#calendar').fullCalendar('changeView', viewName);
};

this.App.parseQueryString = function(queryString) {
  var aux, ele, o, params, _i, _len, _ref;
  if (queryString) {
    params = {};
    _ref = decodeURI(queryString).split("&");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      ele = _ref[_i];
      aux = ele.split('=');
      o = {};
      if (aux.length >= 1) {
        o[aux[0]] = aux[1];
        _.extend(params, o);
      }
    }
    return params;
  }
};

this.App.showMap = function(err, data) {
    if (data.lbounds) {
        App.map.fitBounds(data.lbounds);
    } else if (data.latlng) {
      if (App.mark) App.map.removeLayer(App.mark);
      App.currentEvent.lat = data.latlng[0];
      App.currentEvent.lng = data.latlng[1];
      App.map.setView([data.latlng[0], data.latlng[1]], 13);
      App.mark = L.marker([data.latlng[0], data.latlng[1]]).addTo(App.map);
      App.mark.bindPopup(App.currentEvent.address);
    }
}

var prepareModal = function(status, evt) {
  if (status === 'add') {
    $('#myModal .modal-title').html('New Event');
    $('#saveEvent').html('Add');
     $("#current_evt_data").html();
    $("#current_evt_action").html("add");
  } else {
    $('#myModal .modal-title').html('Edti Event');
    $('#saveEvent').html('Update');
    $("#current_evt_data").html(JSON.stringify(evt));
    $("#current_evt_action").html("edit");
  }
  $("#title").val(evt.title);
  $("#msg").val(evt.desc);
  $("#eventStart").val(evt.start);
  $("#eventEnd").val(evt.end);
  $("#eventAllDay").val(evt.allDay);
};