$(document).ready(function($) {

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
  $('#instructions-btn').on('click',function(e){
    e.preventDefault();
    swal('Hello from the other side', '1) Log in or sign up first\n2) At your portfolio, you can view your owned paintings or add new paintings to your collection\n3) Go on to search paintings through the navbar- this is strict search\n4) If you want to see the index, try direct url \/search\n5) At Curator, you can like random art from the database\n6) You may also edit your username or email in the Edit Account page\(\/profile\)\nTest image urls: http://www.ksarts.com/davis/guernica_bw.jpg\nhttp://images.mentalfloss.com/sites/default/files/styles/article_640x430/public/ahh.png\nhttps://s-media-cache-ak0.pinimg.com/564x/a1/60/16/a16016b8791bae9ee6e00c8d7223dd49.jpg\n')
  })
  //ajax calls for navbar-based page population
  $('#curate-btn').on('click',function(e){
    // $('#search-page').css('display','none')
    // $('#portfolio-page').css('display','none')
    // $('#curate-page').css('display','unset')
    //populate curate section
  })
  function fillCuratorPage(painting){

  }
  $('#portfolio-btn').on('click',function(e){
    e.preventDefault();
    // $('#curate-page').css('display','none')
    $('#search-page').css('display','none')
    $('#portfolio-page').css('display','unset')
    //populate portfolio section
    $.get({
      url: '/api/paintings/userid/',
      error: function(){
        $(".all-painting-list").html('<br><p style="color: red">Error on refresh of your portfolio. Please try again.</p>')
      }
    }).done(fillPortfolioPage)
  })
  function fillPortfolioPage(paintings){
    $('.all-painting-list').empty();
    paintings.forEach(function(painting,index){
      //BUG: due to painting.id being undefined - delete buttons no longer works after pressing the portfolio tab on navbar. Consider just refactoring into ajax + embedded templates in the main page
      var textNode1 = '<div class="col-md-4 painting"><a href=' + painting.permalink + '> Name: ' + 'painting.name' + '<br>Category: ' + painting.category + '<br>Artist: ' + painting.artist
      var textNode2 = '<br><img class="img-thumbnail" src=' + painting.imageUrl +  'alt=' + painting.name + 'style="width:16.75em;max-height:23em"><br>Price: ' + painting.price + '<br></a><form method="POST" action="/api/paintings/' + painting.id +  '?_method=DELETE"><button class="btn btn-default btn-danger" type="submit">Delete</button></form></div>'
      if(index === 0 || index % 3 ){
        $('.all-painting-list').append($.parseHTML('<div class="row">'))
      }
      $('.all-painting-list').append(textNode1);
      $('.all-painting-list').append(textNode2);
      if(index % 3 == 2 ){
        $('.all-painting-list').append($.parseHTML('</div class ="row">'))
      }
    })
  }

  $('#search-btn').on('click',function(e){
    e.preventDefault();
    // $('#curate-page').css('display','none')
    $('#portfolio-page').css('display','none')
    $('#search-page').css('display','unset')
    //populate search list
  })
  function fillSearchPage(){

  }

  //ajax call for creating a painting
  $('#painting-form').on('submit',function(e){
    e.preventDefault();
    var formdata = $(this).serializeArray();
    $.post({
      url: '/api/paintings/create/',
      data: formdata,
      error: function() {
        $(".all-painting-list").html('<br><p style="color: red">Invalid painting details. Please try again.</p>')
      },
      success: refreshPortfolio
    })
  })
  function refreshPortfolio(){
    $.get({
      url: '/api/paintings/userid/',
      error: function(){
        $(".all-painting-list").html('<br><p style="color: red">Error on refresh of your portfolio. Please try again.</p>')
      },
      success: fillPortfolioPage
    })
  }
  //ajax calls for search function
  $('#searchName').on('submit', function(e) {
    e.preventDefault()
    var query = $(this).serializeArray()[0].value;
    $.get({
      url: '/api/paintings/name/' + query,
      error: function() {
        $("#search-painting-list").html('<br><p style="color: red">No painting found. Please try again.</p>')
      },
      success: appendPaintings
    })
  })
  $('#searchCategory').on('submit', function(e) {
    e.preventDefault()
    var query = $(this).serializeArray()[0].value;
    $.get({
      url: '/api/paintings/category/' + query,
      error: function() {
        $("#search-painting-list").html('<br><p style="color: red">No painting found. Please try again.</p>')
      },
      success: appendPaintings
    })
  })
  $('#searchArtist').on('submit', function(e) {
    e.preventDefault()
    var query = $(this).serializeArray()[0].value;
    $.get({
      url: '/api/paintings/artist/' + query,
      error: function() {
        $("#search-painting-list").html('<br><p style="color: red">Please try again.</p>')
      },
      success: appendPaintings
    })
  })
  function appendPaintings(paintingsArr) {
    if (paintingsArr.length == 0) {
      $("#search-painting-list").html('<br><p style="color: red">No painting found. Please try again.</p>')
    } else {
      $("#search-painting-list").empty();
      //BUG:append is overwriting for some reason, solved by using success func in ajax call instead of .done promise
      paintingsArr.forEach(function(painting) {
        var insertStr = "<div class='col-md-4 painting'><a href=" + painting.permalink + " target='_blank'>Name: " + painting.name + "<br>Category: " + painting.category + "<br>Artist: " + painting.artist + "<br><img class='img-thumbnail' src=" + painting.imageUrl + " style='max-width:18.75em;max-height:25em'>" + "</a><br>Owned by: " + painting.ownedBy.local.name + "</div>";
        $("#search-painting-list").append(insertStr)
      })
    }
  }
  //ajax call for editing user
  $('#update-user-form').on('submit',function(e){
    e.preventDefault();
    var formdata = $(this).serializeArray();
    console.log(formdata)
    $.ajax({
      url: '/api/users/edit',
      type: 'PUT',
      data: formdata,
      error: function() {
        $("#profile-page").append('<br><p style="color: red">Update did not go through. Please try again.</p>')
      },
      success: function(user){
        swal('User updated!')
      }
    })
  })

})
