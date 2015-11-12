
//Default template route
Router.configure({
  layoutTemplate: 'layout'
});



//Home route
Router.route('/', {name: 'home'});

//The Calendar route
Router.route('/cal', {name: 'fullCalendar'});
