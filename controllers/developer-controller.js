
module.exports = function(router, db, passport){

  router.get("/developer/:id", function(req, res) {
    db.Developer.find({
      where: {
        id: req.params.id
      },
      include: [{
        model: db.User,
        attributes: ['name', 'id', 'bio']
      },
      {
        model: db.ProjectDeveloper,
        attributes: ['ProjectId']
      }]
    }).then(function(data) {
      var projects = [];
      if(data.ProjectDevelopers.length) {
        data.ProjectDevelopers.forEach(val => {
          db.Project.find({
            where : {id:  val},
            attributes: ['project_name']
          }).then(function(datum) {
            projects.push({id: val, project_name: datum.project_name});
          });
        });
      }
      res.render('devProfile', {
        developer: data,
        projects: projects
      })
      // res.json(data);
    })
  });

  router.get('/developers', function(req, res) {
    db.Developer.findAll({
      // attributes: [ 'name', 'bio', 'skills'],
      include: [{
        model: db.User,
        attributes: ['name', 'id']
      }]
    }).then(function(data) {
      //res.json(data);
      res.render('alldevelopers', { developers: data, layout: 'dashboard' });
    })
  });

  router.get("/invite/developer/:id", function(req, res) {
    var devId = req.params.id;
    db.Entrepeneur.find({
      where: {
        id: currentUserId
      },
      include: [{
        model: db.Project,
        attributes: ['project_name', 'id']
      }]
    }).then(function(data) {
      res.render('sendInvite', {
        layout: 'dashboard'
        projects: data.Projects,
        personId: devId,
        type: 'dev'
      });
    })
  });

}
