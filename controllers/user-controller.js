module.exports = function(router, db) {

  router.get('/', function(req,res) {
    res.render('index', {});
  });

  router.get('/userdash/:id', function(req, res) {
    db.UserRole.find({
      where: {
        UserId: req.params.id
      },
        include: [
          db.Role
        ]
    }).then(function(row){
      var table = null;
      var include = [];
      switch(row.Role.name) {
        case 'ent':
          table = db.Entrepeneur;
          include.push(db.Project);
          break;
        case 'dev':
          table = db.Developer;
          include.push(db.DeveloperInvite);
          include.push(db.DeveloperRequest);
          break;
        case 'inv':
          table = db.Investor;
          include.push(db.InvestorInvite);
          include.push(db.InvestorRequest);
          break;
      }
      console.log(table);
      table.findOne({
        where: {
          UserId: row.UserId
        },
        include: include
      }).then(function(data){
        res.render('dash', {
          layout: 'dashboard',
          projects: data.Projects
        });
      });
    });
  });

  router.get('/login', function(req, res) {
    res.render('login', {});
  });

  router.get('/join', function(req, res) {
    res.render('join', {});
  });

  router.post('/join/:type', function(req, res) {

  });

  router.put('/acceptinvite/:id', function(req, res) {
    //need to find the investor type first
    db.developerInvite.update();
    db.ProjectDeveloper.update();
    //OR
    db.InvestorInvite.update();
    db.ProjectInvestor.update();
  });
}