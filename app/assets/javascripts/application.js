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
//= require_tree .


app = angular.module('app', [])




app.factory('Comment', ['$http', function($http){
  var baseURL    = 'http://localhost:3000/api/v1'
  
  function commentsURL(){
    return baseURL+'/comments'
  }

  function commentURL(id){
    return baseURL+'/comments/'+id
  }

  return {
    getComments: function(){
      return $http.get(commentsURL())
    },
    getComment: function(id){
      return $http.get(commentURL(id))
    },
    postComment: function(comment){
      return $http.post(commentsURL(), comment)
    },
    putComment: function(comment){
      return $http.put(commentURL(comment.id), comment)
    },
    deleteComment: function(comment){
      return $http.delete(commentURL(comment.id))
    }
  }
}])




app.controller('CommentsController', ['$scope', 'Comment', function($scope, Comment){
  $scope.indexComments = function(){
    Comment.getComments().success(function(comments){
      $scope.comments = comments
    })
  }

  $scope.createComment = function(comment){
    Comment.postComment(comment).success(function(comment){
      $scope.comments.push(comment)
      $scope.newComment = {}
    })
  }

  $scope.editComment = function(comment){
    comment.isEditing = true
  }

  $scope.updateComment = function(comment){
    Comment.putComment(comment).success(function(){
      comment.isEditing = false
    })
  }

  $scope.destroyComment = function(comment){
    Comment.deleteComment(comment).success(function(){
      $scope.comments.splice($scope.comments.indexOf(comment), 1)   // ugh
    })
  }

  $scope.indexComments()
}])
