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
//= require_tree .


// note: deliberately left as huge blob in single file




// "Model" functions

var baseURL = 'http://localhost:3000/api/v1'

function commentsURL(){
  return baseURL+'/comments'
}

function commentURL(id){
  return baseURL+'/comments/'+id
}


function getComments(success){
  $.ajax({
    type: 'GET',
    url: commentsURL(),
    success: success
  })
}

function getComment(id, success){
  $.ajax({
    type: 'GET',
    url: commentURL(id),
    success: success
  })
}

function postComment(data, success){
  $.ajax({
    type: 'POST',
    url: commentsURL(),
    data: data,
    success: success
  })
}

function putComment(id, data, success){
  $.ajax({
    type: 'PUT',
    url: commentURL(id),
    data: data,
    success: success
  })
}

function deleteComment(id, success){
  $.ajax({
    type: 'DELETE',
    url: commentURL(id),
    success: success
  })
}




// "Controller" functions

function getCommentID(event){
  return $(event.target).closest('.comment').data('id');
}


function indexComments(event){
  getComments(appendComments)
}

function editComment(event){
  var id   = getCommentID(event)
  getComment(id, showCommentForm)
}

function createComment(event){
  var data = $(event.target).serialize()
  postComment(data, appendComment)
  $(event.target).trigger('reset')
  event.preventDefault()
}

function updateComment(event){
  var id   = getCommentID(event)
  var data = $(event.target).serialize()
  putComment(id, data, showComment)
  event.preventDefault()
}

function destroyComment(event){
  var id = getCommentID(event)
  deleteComment(id, function(){ removeComment({id: id}) })
  event.preventDefault()
}


$(document).ready(indexComments)
$(document).on('click',   '.comment .edit',     editComment)
$(document).on('submit',  '.new_comment',       createComment)
$(document).on('submit',  '.comment form',      updateComment)
$(document).on('click',   '.comment .destroy',  destroyComment)




// "View" functions

function renderComment(comment){
  return  $('<div>', {class: 'comment', 'data-id': comment.id}).append(
            $('<span>', {class: 'body', text: comment.body}),
            $('<a>', {href: '#', class: 'edit', text: 'Edit'}),
            $('<a>', {href: '#', class: 'destroy', text: 'Destroy'})
          )
}

function renderCommentForm(comment){
  return  $('<div>', {class: 'comment', 'data-id': comment.id}).append(
            $('<form>', {'data-id': comment.id}).append(
              $('<input>', {name: 'comment[body]'}).val(comment.body),
              $('<input>', {type: 'submit'})
            )
          )
}

function selectComments(){
  return $('.comments')
}

function selectComment(comment){
  return $('.comment[data-id='+comment.id+']')
}

function appendComments(comments){
  $.each(comments, function(_, comment){
    appendComment(comment)
  })
}

function appendComment(comment){
  selectComments().append(renderComment(comment))
}

function showComment(comment){
  selectComment(comment).replaceWith(renderComment(comment))
}

function showCommentForm(comment){
  selectComment(comment).replaceWith(renderCommentForm(comment))
}

function removeComment(comment){
  selectComment(comment).remove()
}
