Router.configure({
  layoutTemplate: 'layout'
});


Router.route('/', {name: 'home'});
Router.route('/cal', {name: 'fullCalendar'});
