
module.exports = function(router, db) {
  //investor dashboard
  router.get('/investor/:id', function(req, res) {
    let invID = req.params.id;
    db.Investor.find({
      where: {
        id: invID
      },
      include : [
        db.ProjectInvestor ]
    }).then(function(data) {
      console.log(data);

      res.end();
    })
  });

  router.put('/investor/acceptinvite/:id', function(req, res) {
    db.InvestorInvite.update();
    db.ProjectInvestor.update();
  });


  router.get('/investor/browse', function(req, res) {
    db.Projects.findAll();

  });

  router.get("/investor/browse/:id", function(req, res) {
    let projID = req.params.id;
    db.Project.findOne();
    //res.render etc
  });


  //request a
  router.post("/investor/browse/:id", function(req, res) {
    let projID = req.params.id;
    let invID = req.body.id;
    db.InvestorRequest.create();
  });

}

