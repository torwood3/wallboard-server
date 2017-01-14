var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  db.Device.findAll().then(function (devices) {
    res.render('index', {
      title: 'Generator-Express MVC',
	    devices: devices[0].id
    });
  });
});


