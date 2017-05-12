module.exports = function(router, db) {

  router.get('/', function(req,res) {
    res.render('index', {});
  });

  router.get('/userdash/:id', function(req, res) {
    res.render('dash', { layout: 'dashboard'})
  });

  router.get('/login', function(req, res) {
    res.render('login', {});
  });

  router.get('/join', function(req, res) {
    res.render('join', {});
  });

  router.post('/join/:type', function(req, res) {

  });

  router.put('/acceptinvite/:id', function(req, res) {
    //need to find the investor type first
    db.developerInvite.update();
    db.ProjectDeveloper.update();
    //OR
    db.InvestorInvite.update();
    db.ProjectInvestor.update();
  });
}