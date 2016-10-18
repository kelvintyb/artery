$(document).ready(function() {
  var $userForm = $('.new-user')
  $userForm.on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serializeArray();
    $.ajax({
      type: 'POST',
      url: '/users',
      data: formData
    });
  });
});
