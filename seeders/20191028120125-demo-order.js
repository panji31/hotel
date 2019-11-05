'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('orders', [{
      idcustomer: 1,
      idroom: 1,
      is_done: true,
      is_booked: true,
      duration: 10,
      order_end_time: ''
    },
    {
      idcustomer: 2,
      idroom: 2,
      is_done: true,
      is_booked: true,
      duration: 10,
      order_end_time: ''
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {

  }
}; 
