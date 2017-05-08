const express = require('express');
const db = require('../models');

//define express router
const router = express.Router();

//developer dashboard
router.get('/developer/:id', function(req, res) {
  let devID = req.params.id;
  db.Developer.findOne()
  db.ProjectDeveloper.findAll()
  db.DeveloperRequests.findAll()
  db.DeveloperInvites.findAll()
  //TODO res.render etc
});

router.put('/developer/acceptinvite/:id', function(req, res) {
  db.DeveloperInvite.update();
  db.ProjectDeveloper.update();//celtics are losing
});


router.get('/developer/browse', function(req, res) {
  db.Projects.findAll(); //maybe find where needs has developer??

});

router.get("/developer/browse/:id", function(req, res) {
  let projID = req.params.id;
  db.Project.findOne();
  //res.render etc
});


//request a
router.post("/developer/browse/:id", function(req, res) {
  let projID = req.params.id;
  db.DeveloperRequest.create();
});



