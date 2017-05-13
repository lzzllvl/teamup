
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
        model: db.ProjectDeveloper
        attributes: ['ProjectId']
      }]
    }).then(function(data) {
      var projects = [];
      if(data.ProjectDeveloper.length) {
        data.ProjectDeveloper.forEach(val => {
          db.Project.find({
            where : {id:  val},
            attributes: ['project_name']
          }).then(function(datum){
            projects.push({id: val, project_name: datum.project_name});
          })
        });
      }
      res.render('developer', {
        developer: data,
        projects: projects
      })
      //res.json(data);
      //res.render('home', { devId: req.params.skills });
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
      res.json(data);
      //res.render('alldevelopers', { developers: data });
    })
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

//all developers


}
