module.exports = function(router, db, passport) {

  router.get('/', function(req,res) {
    res.render('index', {});
  });

  router.get('/info/:type', function(req,res) {
    var template = ''
    switch(req.params.type){
      case 'entrepreneur':
        template = 'entrepreneur';
        break;

      case 'developer':
        template = 'developer';
        break;

      case 'investor':
        template = 'investor';
        break;
    }
    res.render(template);
  })

  router.get('/userdash/:id',  function(req, res) {
    currentUserId = req.params.id;
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
      var type;
      switch(row.Role.name) {
        case 'ent':
          type = 'ent';
          table = db.Entrepeneur;
          include.push(db.Project);
          break;
        case 'dev':
          type = 'dev';
          table = db.Developer;
          include.push(db.DeveloperInvite);
          include.push(db.DeveloperRequest);
          break;
        case 'inv':
          type = 'inv';
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
        var isInv = type == 'inv';
        var isDev = type == 'dev';
        var isEnt = type == 'ent';

        var personId;
        var renderData = {
          layout: 'dashboard',
          UserId: row.UserId,
          data: data,
          isInv: isInv,
          isDev: isDev,
          isEnt: isEnt
        }
        if(data.DeveloperInvites && data.DeveloperInvites.length) {
          renderData.personId = data.DeveloperInvites[0].DeveloperId;
          renderData.numDevInvites = data.DeveloperInvites.filter(v => v.accepted).length;
        }
        if(data.DeveloperRequests && data.DeveloperRequests.length){
          renderData.numDevRequests = data.DeveloperRequests.filter(v => v.accepted).length;
        }
        if(data.InvestorInvites && data.InvestorInvites.length) {
          renderData.personId = data.InvestorInvites[0].InvestorId;
          renderData.numInvInvites = data.InvestorInvites.filter(v => v.accepted).length;
        }
        if(data.InvestorRequests && data.InvestorRequests.length) {
          renderData.numInvRequests = data.InvestorRequests.filter(v => v.accepted).length;
        }
         //res.json(renderData);
        res.render('myprojects', renderData);
      });
    });
  });

  router.get('/login', function(req, res) {
    res.render('login', {});
  });


  router.post('/login', function(req, res) {
    db.User.find({
      where: {email: req.body.email}
    }).then(function(row) {
      if(row) {
        db.User.comparePassword(req.body.password, row.password, function(err, result){
          if(err) throw err;
          result
            ?  res.redirect('/userdash/'+ row.id)
            :  res.redirect('/login');
        })
      } else {
        res.redirect('signup');
      }
    })
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

  router.get('/devinvites/:id', function(req, res) {
    db.Project.findAll({
      attributes: ['id', 'project_name']
    }).then(function(data) {
      db.DeveloperInvite.findAll({
        where: {
          DeveloperId: req.params.id
        }
        }).then(function(rows){
          var resultant = [];

          rows.forEach(function(val) {
            var projectId = val.ProjectId;
            var arr = data.filter(function(value) {
              return value.id == projectId;
            });
            resultant.push(arr[0]);
          });
          var renderArray = []
          for(var i = 0; i < resultant.length; i++){
            console.log(resultant[i].id, rows[i].ProjectId);
            if(resultant[i].id == rows[i].ProjectId){
              console.log(rows[i].createdAt);
              renderArray.push({
                inviteId: rows[i].id,
                name : resultant[i].project_name,
                devId: rows[i].DeveloperId,
                projectId: resultant[i].id,
                message: rows[i].message,
                created: String(rows[i].createdAt).split('T')[0].split('-').reverse().join(':'),
                accepted: rows[i].accepted});
            }
          }
          console.log(renderArray)
          var renderObject = {
            projects: renderArray
          }
          res.render('developer-invites',renderObject);
        })
      })
    });

    router.get('/invinvites/:id', function(req, res) {
      db.Project.findAll({
        attributes: ['id', 'project_name']
      }).then(function(data) {
        db.InvestorInvite.findAll({
          where: {
            InvestorId: req.params.id
          }
          }).then(function(rows){
            var resultant = [];

            rows.forEach(function(val) {
              var projectId = val.ProjectId;
              var arr = data.filter(function(value) {
                return value.id == projectId;
              });
              resultant.push(arr[0]);
            });
            var renderArray = []
            for(var i = 0; i < resultant.length; i++){
              console.log(resultant[i].id, rows[i].ProjectId);
              if(resultant[i].id == rows[i].ProjectId){
                console.log(rows[i].createdAt);
                renderArray.push({
                  inviteId: rows[i].id,
                  name : resultant[i].project_name,
                  invId: rows[i].InvestorId,
                  projectId: resultant[i].id,
                  message: rows[i].message,
                  created: String(rows[i].createdAt).split('T')[0].split('-').reverse().join(':'),
                  accepted: rows[i].accepted});
              }
            }
            console.log(renderArray)
            var renderObject = {
              projects: renderArray
            }
            res.render('investor-invites', renderObject);
          })
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