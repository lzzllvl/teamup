const express = require('express');
const db = require('../models');

//define express router
const router = express.Router();

//investor dashboard
router.get('/investor/:id', function(req, res) {
  let devID = req.params.id;
  db.Investor.findOne()
  db.ProjectInvestor.findAll()
  db.InvestorRequests.findAll()
  db.InvestorInvites.findAll()
  //TODO res.render etc
});

router.put('/investor/acceptinvite/:id', function(req, res) {
  db.InvestorInvite.update();
  db.ProjectInvestor.update();//celtics are losing
});


router.get('/investor/browse', function(req, res) {
  db.Projects.findAll(); //maybe find where needs has investor??

});

router.get("/investor/browse/:id", function(req, res) {
  let projID = req.params.id;
  db.Project.findOne();
  //res.render etc
});


//request a
router.post("/investor/browse/:id", function(req, res) {
  let projID = req.params.id;
  db.InvestorRequest.create();
});



