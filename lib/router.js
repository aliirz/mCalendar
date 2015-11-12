Router.configure({
  layoutTemplate: 'layout'
});


// OnBeforeActions = {
//     loginRequired: function(pause) {
//       if (!Meteor.userId()) {
//         this.render('home');
//         return pause();
//       }
//     },
//     redirectToCalendar: function(pause) {
//       if (!Meteor.user()) {
//         if (Meteor.loggingIn()) {
//
//         }
//         else {
//           this.render('fullCalendar');
//           return pause;
//         }
//       }
//     }
// };
//
// Router.onBeforeAction(OnBeforeActions.loginRequired, {
//     only: ['fullCalendar']
// });

Router.route('/', {name: 'home'});
Router.route('/cal', {name: 'fullCalendar'});
