module.exports = function(router, db) {

  router.get('/project/browse', function(req, res) {
    db.Project.findAll();
  });

  router.get("/project/:id", function(req, res) {
    db.Project.FindOne()
  });


  router.post("/project/:id", function(req, res) {
    let projID = req.params.id;
    let invID = req.body.id;
<<<<<<< HEAD
=======

    //need to find user type before
    db.DeveloperInvite.create();
    //OR
>>>>>>> master
    db.InvestorInvite.create();
  });
}