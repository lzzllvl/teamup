
module.exports = function(router, db){
  //developer dashboard
  router.get('/developer/:id', function(req, res) {
    let invID = req.params.id;
    db.Developer.find({
      where: {
        id: invID
      },
      include : [
        db.User,
        db.ProjectDeveloper,
        db.DeveloperRequest,
        db.DeveloperInvite ]
    }).then(function(data) {
      console.log(data);
      res.end();
    })
  });

  router.put('/developer/acceptinvite/:id', function(req, res) {
    db.DeveloperInvite.update();
    db.ProjectDeveloper.update();
  });


  router.get('/developer/browse', function(req, res) {
    db.Projects.findAll(); //maybe find where needs has developer??

  });

  router.get("/developer/browse/:id", function(req, res) {
    let projID = req.params.id;
    db.Project.findOne();
    //res.render etc
  });


  //request a
  router.post("/developer/browse/:id", function(req, res) {
    let projID = req.params.id;
    db.DeveloperRequest.create();
  });


}
