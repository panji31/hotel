'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    idcustomer: DataTypes.INTEGER,
    idroom: DataTypes.INTEGER,
    is_done: DataTypes.BOOLEAN,
    is_booked: DataTypes.BOOLEAN,
    duration: DataTypes.INTEGER,
    order_end_time: DataTypes.DATE
  }, {});
  order.associate = function (models) {
    // associations can be defined here
  };
  return order;
};