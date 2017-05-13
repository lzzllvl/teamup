module.exports = function(router, db, passport) {
  router.get('/entrepreneur/invite/:id', function(req, res) {


  });
  router.get('/entrepreneur/create/:id', function(req, res) {
    res.render('createproject', {UserId: req.params.id});
  })

  router.post('/entrepreneur/create/:id', function(req, res) {
    var newProject = req.body;
    newProject.needs_developer = newProject.needs_developer ? true: false;
    newProject.needs_investor = newProject.needs_investor ? true: false;
    db.Entrepeneur.find({where:{
        UserId: req.params.id
      },
      attributes: ['id']
    }).then(function(data) {
      newProject.EntrepeneurId = data.id;
      db.Project.create(newProject).then(function() {
        res.redirect('/userdash/'+ req.params.id);
      })
    })
    newProject.EntrepeneurId = req.params.id;
    db.Project.create(newProject).then(function() {
      res.redirect('/userdash/'+ req.params.id);
    });
  });

  router.post('/entrepreneur/invite', function(req, res) {
    var table = null;
    switch(req.body.personType){
      case 'inv':
        table = db.InvestorInvite;
        break;
      case 'dev':
        table = db.DeveloperInvite;
        break;
    }
    table.create({
      personId: req.body.personId,
      ProjectId: req.body.ProjectId,
      message: req.body.message
    }).then(function(){
      res.redirect('/userdash/' + currentUserId);
    });
  });
}