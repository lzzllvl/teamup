module.exports = function(router, db, passport) {

  router.get('/project/browse', function(req, res) {
    db.Project.findAll().done(function(rows){
      console.log(rows);
      res.end();
    });
  });

  router.get("/project/:id", function(req, res) {
    db.Project.findOne({
      where: {
        id: req.params.id
      }
    }).done(function(record) {
      console.log(record);
      res.end();
    })
  });


  router.post("/project/:id", function(req, res) {
    let projID = req.params.id;
    let invID = req.body.id;

    //need to find user type before
    db.DeveloperRequest.create();
    //OR
    db.InvestorRequest.create();
  });
}