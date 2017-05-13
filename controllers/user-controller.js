module.exports = function(router, db, passport) {

  router.get('/', function(req,res) {
    res.render('index', {});
  });

  router.get('/info/:type', function(req,res) {
    var template = ''
    switch(req.params.type){
      case 'developer':
        template = 'developer'
        break;
      case 'entrepreneur':
        template = 'entrepreneur';
        break;
      case 'investor':
        template = 'investor';
        break;
    }
    res.render(template);
  })

  router.get('/userdash/:id',  function(req, res) {
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
      table.findOne({
        where: {
          UserId: row.UserId
        },
        include: include
      }).then(function(data){
        res.render('myprojects', {
          layout: 'dashboard',
          projects: data.Projects
        });
      });
    });
  });

  router.get('/login', function(req, res) {
    res.render('login', {});
  });


  router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
  }), function(req, res) {
    res.redirect('/userdash/'+ req.user.id);
  });

  router.get('/join', function(req, res) {
    res.render('join');
  });

  router.post('/join', function(req, res) {
    var clear = req.body.password;
    db.User.setPassword(clear, function(err, user) {
      var newUser = {
        name: req.body.first_name + " " + req.body.last_name,
        email: req.body.email,
        password: user.password
      };
      user.create(newUser).then(function() {
        db.User.find({where: {email: newUser.email}}).then(function(row){
          // req.login(row.dataValues, function(err) {
          //   if (err) { console.log(err) }
          //   return;
          // });
          res.render('profileCreation', {data: row.dataValues});
        });
      });
    });


  router.post('/join/:type', function(req, res) {
      var table = null;
      var userrole = '';
      switch(req.params.type) {
        case 'developer':
          table = db.Developer;
          userrole = 2;
          break;
        case 'entrepeneur':
          table = db.Entrepeneur;
          userrole = 1;
          break;
        case 'investor':
          table = db.Investor;
          userrole = 3;
          break;
      }
      table.create(req.body).then(function(){
        db.UserRole.create({
          RoleId: userrole,
          UserId: req.body.UserId
        }).then(function(){
          res.redirect('/userdash/' + req.body.UserId)
        })
      });
    })
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