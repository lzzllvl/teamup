
module.exports = function(router, db, passport) {
  //investor dashboard
  router.get("/investor/:id", function(req, res) {
    db.Investor.find({
      where: {
        id: req.params.id
      },
      include: [{
        model: db.User,
        attributes: ['name', 'id', 'bio']
      },
      {
        model: db.ProjectInvestor,
        attributes: ['ProjectId']
      }]
    }).then(function(data) {
      var projects = [];
      if(data.ProjectInvestors.length) {
        data.ProjectInvestors.forEach(val => {
          db.Project.find({
            where : {id:  val},
            attributes: ['project_name']
          }).then(function(datum){
            projects.push({id: val, project_name: datum.project_name});
          })
        });
      }
      res.render('invProfile', {
        layout: 'dashboard',
        investor: data,
        projects: projects
      })
      //res.json(data);
      //res.render('home', { devId: req.params.skills });
    })
  });

  router.get('/investors', function(req, res) {
    db.Investor.findAll({
      // attributes: [ 'name', 'bio', 'skills'],
      include: [{
        model: db.User,
        attributes: ['name', 'id']
      }]
    }).then(function(data) {
      res.json(data);
      //res.render('allinvestors', { investors: data });
    })
  });

  router.get("/invite/investor/:id", function(req, res) {
    var invId = req.params.id;
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
        layout: 'dashboard',
        projects: data.Projects,
        personId: invId,
        type: 'inv'
      });
    })
  });


  router.put('/investor/acceptInvite/:id', function(req, res) {

    db.InvestorInvite.update({
      accepted: true
    },{
      where: {
        id: req.params.id
      }
    }).then(function() {
      res.redirect('/userdash/' + currentUserId);
    })
  });

}