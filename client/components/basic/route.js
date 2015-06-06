Router.configure({
  layoutTemplate: 'main',
  notFoundTemplate: '404',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('home', {
    path: '/',
    action: function() {
      this.render('home');
    }
  });

  this.route('about', {
    path: '/about',
    action: function() {
      this.render('about');
    }
  });

  this.route('notFound', {
    path: '*',
    layoutTemplate: ''
  }); // 404
});

// page title
Router.onAfterAction(function() {
  document.title = [App.name, ' - ', this.route.getName()].join('');
	if (App.env === 'development') {
		Session.set('currentView', this.route.getName());
	}
});
