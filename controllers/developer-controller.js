
module.exports = function(router, db){
  //developer dashboard
  router.get('/developer/:id', function(req, res) {
    let invID = req.params.id;
    db.Developer.find({
      where: {
        id: invID
      },
      include: [
        db.ProjectDeveloper ]
    }).then(function(data) {
      console.log(data);
      res.end();
    })
  });

  router.get('/developer/browse', function(req, res) {
    db.Developer.findAll();
  });

  router.get("/developer/browse/:id", function(req, res) {
    let devID = req.params.id;
    db.Developer.findOne();
    //res.render etc
  });

  //invite a developer
  router.post("/developer/browse/:id", function(req, res) {
    let devID = req.params.id;
    db.DeveloperRequest.create();
  });
}
