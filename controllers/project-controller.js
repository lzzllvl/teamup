module.exports = function(router, db, passport) {

  router.get('/project/browse', function(req, res) {
    db.Project.findAll({
      attributes: ['id', 'short_description', 'project_name', 'needs_investor', 'needs_developer', 'project_industry']
    }).done(function(rows) {
      res.render('allprojects', { projects: rows });
    });
  });

  router.get("/project/:id", function(req, res) {
    db.Project.findOne({
      where: {
        id: req.params.id
      }
    }).done(function(row) {
      res.render('project', {project: row});
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

  router.post("/project/request", function(req, res) {
    db.Developer.find({
      where: {
        UserId: req.body.UserId
      },
      attributes: ['id']
    }).then(function(data) {
      db.DeveloperRequest.create({
        ProjectId: req.body.ProjectId,
        DeveloperId: data.id,
        message: req.body.message
      }).then(function() {
        res.redirect('userdash/' + "");
      });
    })
  });
}