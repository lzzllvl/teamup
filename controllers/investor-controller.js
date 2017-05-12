
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

  router.get('/investor/browse', function(req, res) {
    db.Investor.findAll();
  });

  //invite an investor
  router.post("/investor/:id", function(req, res) {
    let projID = req.params.id;
    let invID = req.body.id;
    db.InvestorInvite.create();
  });
}

