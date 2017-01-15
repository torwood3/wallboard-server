var express = require('express'),
	router = express.Router(),
	db = require('../models');
var ping = require ("ping");
var wol = require('wake_on_lan');
var request = require('superagent');

module.exports = function (app) {
	app.use('/api/devices', router);
};

router.get('/', function (req, res, next) {
	db.Device.findAll().then(function (devices) {
		console.log(devices);
		res.status(200).json({devices: devices});
	})
		.catch(function (error) {
			res.status(500).json(error);
		});;
});

router
	.get('/:id/wol', function(req, res) {
		db.Device.findById(req.params.id).then(function (device) {
			wol.wake(device.mac, function (error) {
				if (error) {
					res.status(200).json({error: "Magic paquet error"});
				} else {
					res.send();
				}
			});
		})
			.catch(function (error) {
				res.status(500).json(error);
			});;
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
		})
			.catch(function (error) {
				res.status(500).json(error);
			});;
	});

router
	.get('/:id/ping', function (req, res, next) {
		db.Device.findById(req.params.id).then(function (device) {
			pingDevice(device).then(function (result) {
				console.log(result);
				res.status(200).json({isAlive: result.alive.toString()});
			});
	})
			.catch(function (error) {
				res.status(500).json(error);
			});;
});


var pingDevice = function(device) {
	return ping.promise.probe(device.ip);
}


