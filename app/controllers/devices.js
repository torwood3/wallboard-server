var express = require('express'),
	router = express.Router(),
	db = require('../models');
var ping = require ("ping");
var wol = require('wake_on_lan');
var request = require('superagent');

module.exports = function (app) {
	app.use('/devices', router);
};

router.get('/', function (req, res, next) {
	db.Device.findAll().then(function (devices) {
		res.json('index', {devices: devices});
	});
});

router
	.get('/:id/wol', function(req, res) {
		db.Device.findById(req.params.id).then(function (device) {
			wol.wake(device.mac, function (error) {
				if (error) {
					res.json({error: "Magic paquet error"});
				} else {
					res.send();
				}
			});
		});
	});

router
	.get('/:id/poweroff', function(req, res) {
		db.Device.findById(req.params.id).then(function (device) {
			request
				.get('http://' + device.ip +':'+ device.port +'/api/poweroff')
				.end(function(err, res) {
					if (err) {
						console.log(err);
						res.send();
						return;
					}
					res.send();

					setTimeout(function(){
						pingDevice(device).then(function (result) {
							if (result.alive) {
								request.get('http://' + device.ip +':'+ device.port +'/api/poweroff')
							}
						});
					}, 60 * 1000);

				});
		});
	});

router
	.get('/:id/ping', function (req, res, next) {
		db.Device.findById(req.params.id).then(function (device) {
			pingDevice(device).then(function (result) {
				console.log(result);
				res.json({isAlive: result.alive.toString()});
			});
	});
});


var pingDevice = function(device) {
	return ping.promise.probe(device.ip);
}


