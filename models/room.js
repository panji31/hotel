'use strict';
module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define('room', {
    name: DataTypes.STRING
  }, {});
  room.associate = function (models) {
    room.hasMany(models.order, { foreignKey: 'idroom', as: 'dataorder' });
  };
  return room;
};