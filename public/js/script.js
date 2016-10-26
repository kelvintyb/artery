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

      //ajax calls for search.ejs
      $('#searchName').on('submit', function(e) {
        e.preventDefault()
        var query = $(this).serializeArray()[0].value;
        $.get({
          url: '/api/paintings/name/' + query,
          error: function() {
            $("#search-painting-list").html('<br><p style="color: red">No painting found. Please try again.</p>')
          }
        }).done(appendPaintings)
      })

      $('#searchCategory').on('submit', function(e) {
        e.preventDefault()
        var query = $(this).serializeArray()[0].value;
        $.get({
          url: '/api/paintings/category/' + query,
          error: function() {
            $("#search-painting-list").html('<br><p style="color: red">No painting found. Please try again.</p>')
          }
        }).done(appendPaintings)
      })

      $('#searchArtist').on('submit', function(e) {
        e.preventDefault()
        var query = $(this).serializeArray()[0].value;
        $.get({
          url: '/api/paintings/artist/' + query,
          error: function() {
            $("#search-painting-list").html('<br><p style="color: red">No painting found. Please try again.</p>')
          },
          success:appendPaintings
        })
      })
      function appendPaintings(paintingsArr) {
        // console.log(paintingsArr)
        $("#search-painting-list").empty();
        //append is overwriting for some reason
        paintingsArr.forEach(function(painting){
          // console.log(painting)
          $("#search-painting-list").append("<div class='col-md-4 painting'><a href=" + painting.permalink + ">Name: " + painting.name + "<br>Category: " + painting.category + "<br>Artist: " + painting.artist + "<br><img class='img-thumbnail' src=" + painting.imageUrl + " alt=" + painting.name + " style='max-width:18.75em;max-height:25em'><br>Price: " + painting.price + "<br></a></div>")
        })
      }
})
