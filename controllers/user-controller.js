module.exports = function(router, db) {

  router.get('/', function(req,res){
    res.sendFile(index.html);
  });

  router.get('/userdash/:id', function(req, res) {

  });

  router.get('/login', function(req, res) {

  });

  router.get('/signup' function(req, res) {

  });

  router.post('/signup/:type', function(req, res) {

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