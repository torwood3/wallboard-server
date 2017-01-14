// Example model


module.exports = function (sequelize, DataTypes) {

  var Device = sequelize.define('Device', {
    name: DataTypes.STRING,
    ip: DataTypes.STRING,
    mac: DataTypes.STRING,
	  status: DataTypes.BOOLEAN
  });

  return Device;
};

