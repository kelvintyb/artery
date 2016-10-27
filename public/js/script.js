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

  //ajax calls for navbar
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
      url: '/api/paintings/userid/' + req.user.id,
      error: function(){
        $(".all-painting-list").html('<br><p style="color: red">Error on refresh of your portfolio. Please try again.</p>')
      },
      success: fillPortfolioPage
    })
  })
  function fillPortfolioPage(paintings){
    $('.all-painting-list').empty();
    paintings.forEach({
      // $('.all-painting-list').append(painting);
      //NOTE: LAST LEFT IT OFF HERE 2710 1215pm
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
      url: '/api/paintings/userid/' + req.user.id,
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



})
