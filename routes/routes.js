//ONLY USE THESE ROUTES WHEN REFACTORING INTO SINGLE PAGE APP

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.render('index.ejs');
  }).

  app.get('/login', function(req, res) {
    res.render('login.ejs', {
      message: req.flash('loginMessage')
    })
  })

  // app.post('/login', passportStuff)

  app.get('/signup', function(res, req) {
    res.render('signup.ejs', {
      message: req.flash('signupMessage')
    });
  });
  // app.post('/signup',passportStuff)

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user: req.user;
    });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
  }

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  })
}
