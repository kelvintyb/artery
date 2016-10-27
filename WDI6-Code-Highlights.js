/*=======
Portfolio View
=======*/
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
//ajax switch to search and back
$('#search-btn').on('click',function(e){
  e.preventDefault();
  // $('#curate-page').css('display','none')
  $('#portfolio-page').css('display','none')
  $('#search-page').css('display','unset')
  //populate search list
})
/*=======
Search View
=======*/
//ajax calls for search functionality(name,category,artist)
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
router.get('/name/:name', function(req, res) {
  var query = {'name': req.params.name};
  Painting.find(query)
          .populate("ownedBy")
          .exec(function(err, paintings) {
          res.json(paintings)
        })
})
//helper func to append paintings to list after search
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
//ajax switch to portfolio
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
/*=======
Curator View
=======*/
//no ajax, updates painting likes and updates User likelist and categoryScore
router.post('/updatelikes', authPass, function(req, res) {
  var currPaintingScore = 0,
    categoryHelper = {
      "Renaissance": 1,
      "Post-Impressionism": 2,
      "Cubism": 3
    };
  Painting.findById(req.body.paintingId, function(err, model) {
    if (err) throw new Error(err);
    model.likes += 1;
    currPaintingScore = categoryHelper[model.category]
    model.save();
  })
  User.findById(req.user.id, function(err, model) {
    if (err) throw new Error(err);
    //calculate avg cat score
    model.categoryScore = Math.round((model.categoryScore + currPaintingScore) / (model.likeList.length + 1))
    model.likes += 1;
    model.save();
  })
  User.findByIdAndUpdate(req.user.id, {
    $addToSet: {
      "likeList": req.body.paintingId
    }
  }, function(err, model) {
    if (err) throw new Error(err);
    res.redirect('/curator');
  })
})

/*=======
Profile View
=======*/
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

router.put('/edit',function(req,res,next){
  User.findById(req.user.id, function(err,model){
    if (req.body.user.local.name !== ""){
      model.local.name = req.body.user.local.name;
    }
    //BUG: Suspect the below may be the cause of the log-in bug - user cannot log back in after logging out. further testing required
    if(req.body.user.local.email !== ""){
      model.local.email = req.body.user.local.email;
    }
    model.save(function(err,savedUser){
      res.json(savedUser);
    })
  })
})

/*=======
Painting API Routes
=======*/
//GET ALL
router.get('/all', function(req, res) {
  Painting.find({})
          .exec(function(err, paintings) {
          res.json(paintings)
        })
})
//GET USER'S PAINTINGS
router.get('/userid', function(req,res){
  var query = {'ownedBy': req.user.id};
  Painting.find(query)
          .exec(function(err, paintings){
            res.json(paintings)
          })
})
//GET FROM SEARCH - EG BELOW IS FOR PAINTING NAME
router.get('/name/:name', function(req, res) {
  var query = {'name': req.params.name};
  Painting.find(query)
          .populate("ownedBy")
          .exec(function(err, paintings) {
          res.json(paintings)
        })
})
//POST
router.post('/create',authPass,function(req,res){
  var paintingAttr = req.body.painting;
  var newPainting = new Painting({
    name: paintingAttr.name,
    category: paintingAttr.category,
    artist: paintingAttr.artist,
    imageUrl: paintingAttr.imageUrl,
    price: paintingAttr.price,
    permalink: paintingAttr.permalink,
    likes: 0,
    ownedBy: req.user.id
  });
  newPainting.save(function(err, newPainting) {
    if (err) throw err;
    User.findByIdAndUpdate(req.user.id, {
      $addToSet: {
        "ownList": newPainting.id
      }
    }, function(err, model) {
      if (err) throw new Error(err);
      res.json(model)
    })
  })
})
//PUT - This is for both user/painting
router.post('/updatelikes', authPass, function(req, res) {
  var currPaintingScore = 0,
    categoryHelper = {
      "Renaissance": 1,
      "Post-Impressionism": 2,
      "Cubism": 3
    };
  Painting.findById(req.body.paintingId, function(err, model) {
    if (err) throw new Error(err);
    model.likes += 1;
    currPaintingScore = categoryHelper[model.category]
    model.save();
  })
  User.findById(req.user.id, function(err, model) {
    if (err) throw new Error(err);
    //calculate avg cat score
    model.categoryScore = Math.round((model.categoryScore + currPaintingScore) / (model.likeList.length + 1))
    model.likes += 1;
    model.save();
  })
  User.findByIdAndUpdate(req.user.id, {
    $addToSet: {
      "likeList": req.body.paintingId
    }
  }, function(err, model) {
    if (err) throw new Error(err);
    res.redirect('/curator');
  })
})
// DELETE
router.delete('/:id',authPass, function(req,res){
  Painting.findByIdAndRemove(req.params.id,function(err){
    if (err) throw new Error(err);
    res.redirect('/portfolio')
  })
})
