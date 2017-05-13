
module.exports = function(router, db, passport) {
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

  //investor join

  router.post('/investor/:id/join', function(req, res) {
    db.Investor.findOne();
    let proID = req.params.id;
    let intID = req.body.id;
    res.render('invJoinForm', {});
  });
}



