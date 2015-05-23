'use strict';
Template.profile.helpers({
  user: function(){
    return Meteor.user();
  },
  profileImage: function() {
    var user = Meteor.user();
    var photo = Images.findOne({_id: user.profile.photo});
    return photo.url();
  },
  profileImages: function() {
    return Images.find({owner: Meteor.userId()});
  }
});

Template.profile.events({
  'click .profile-photos': function(e, t) {
    var userId = Meteor.userId();
    var photoId = $(e.target).data('id');
    Meteor.users.update({_id: userId}, {$set: {'profile.photo': photoId}});
  },
  'change #image': function(e, t) {
    var photo = new FS.File(e.target.files[0]);
    photo.owner = Meteor.userId();
    var fileObj = Images.insert(photo);
    var userId = Meteor.userId();
    Meteor.users.update({_id: userId}, {$set: {'profile.photo': fileObj._id}});
  },
  'click #update': function(e) {
    e.preventDefault();
    var userId = Meteor.userId();
    var userName = $('#name').val();
    var email = $('#email').val();
    HTTP.put('/user/' + userId, {
      data: {username: userName, email: email}
    }, function(error, resp) {
      if (!error) {
        Router.go('/calendar');
      }
    });
  }
});
