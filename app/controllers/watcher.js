var	db = require('../models');
var polo = require('polo');
var apps = polo();

var toggleDeviceStatus = function(name) {
	db.Device.update({
		updatedAt: new Date(),
		status: true
	}, {
		where: {
			name: {
				$eq: name
			}
		}
	});
}

var onDeviceUp = function(name) {
	if(apps.get(name) !== null) {
		toggleDeviceStatus(name);
	} else {
		if(name.indexOf("wol-") != -1) {
			var service = apps.get(name);
			db.Device.create({
				name: service.name,
				ip: service.ip,
				mac: service.mac,
				status: true
			});
		}
	}
}

var onDeviceDown = function(name) {
	if(apps.get(name) !== null) {
		toggleDeviceStatus(name);
	}
}


module.exports = function (app) {
	console.log("Watchers");
	//On lance les watcher sur polo
	apps.on('up', function(name, service) {
		onDeviceUp(name);
	});

	apps.on('down', function (name, service) {
		onDeviceDown(name);
	});
};


