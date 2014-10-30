// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require angular
//= require angular-resource
//= require_tree .


app = angular.module('app', ['ngResource'])




app.factory('Comment', ['$resource', function($resource){
  return $resource('http://localhost:3000/api/v1/comments/:id', {id: '@id'}, {
    update: {
      method: 'PUT'
    }
  })
}])




app.controller('CommentsController', ['$scope', 'Comment', function($scope, Comment){
  $scope.indexComments = function(){
    Comment.query(function(comments){
      $scope.comments = comments
    })
  }

  $scope.createComment = function(comment){
    Comment.save(comment, function(comment){
      $scope.comments.push(comment)
      $scope.newComment = {}
    })
  }

  $scope.editComment = function(comment){
    comment.isEditing = true
  }

  $scope.updateComment = function(comment){
    Comment.update(comment, function(){
      comment.isEditing = false
    })
  }

  $scope.destroyComment = function(comment){
    Comment.delete(comment, function(){
      $scope.comments.splice($scope.comments.indexOf(comment), 1)   // ugh
    })
  }

  $scope.indexComments()
}])
