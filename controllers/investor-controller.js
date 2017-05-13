
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
      if(data.ProjectInvestor.length) {
        data.ProjectInvestor.forEach(val => {
          db.Project.find({
            where : {id:  val},
            attributes: ['project_name']
          }).then(function(datum){
            projects.push({id: val, project_name: datum.project_name});
          })
        });
      }
      res.render('investor', {
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



