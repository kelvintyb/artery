$(document).ready(function($) {

  //this logic is for ajax calls only
  var $userForm = $('.new-user')

  $userForm.on('submit', function(e) {
    e.preventDefault()
    var formdata = $(this).serializeArray()
    window.alert('ajax call now')
    $.post({
      url: '/api/users',
      data: formdata
    }).done(doSomething)
  })

  function doSomething(data) {
    console.log(data);
    window.alert('form submitted, new users created')
    $('#all-user-list').append('<li>' + data.local.name + '<br>' + data.local.email + '<br>' + data.local.password + '</li>')
  }

  //ajax logic for curator.ejs - http://stackoverflow.com/questions/20321291/ajax-call-to-from-mongodb-example-for-node-express
  //when ready to refactor to ajax, go to curator ejs and take out form element
  // var $thumbsUp = $('.thumbs-up'); <a href="#" class='thumbs-up'> to be placed back into curator.ejs
  // var $thumbsDown = $('.thumbs-down');
  // var randomiser = function (arr) {
  //   var rand = Math.floor(Math.random() * arr.length);
  //   return arr[rand];
  // }
  // $thumbsUp.on('click',function(e){
  //   e.preventDefault();
  // })
  // $thumbsDown.on('click',function(e){
  //   e.preventDefault();
  //   $('.paintingContainer').remove();
  //   $('.artshow').append()
  // })


})
