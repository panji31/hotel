var moment = require('moment');
moment().format();


const { Op } = require('sequelize')
const users = require('../models').users;
const room = require('../models').room;
const customer = require('../models').customer;
const order = require('../models').order;
const jwt = require('jsonwebtoken');

exports.index = (req, res) => {
    const booked = req.query.is_booked;
    if (booked == 'true') {
        room.findAll({
            include: [
                {
                    model: order, as: 'dataorder',
                    required: false
                }
            ]
        }).then(data => res.send(data))
    }

}
exports.checkin = (req, res) => {
    const idRoom = { idroom: req.body.idroom };
    var duration = req.body.duration;
    var time = moment().add(duration, 'm').format("Y-MM-DD hh:mm:ss");
    var EndTime = { order_end_time: time }
    var data = {
        ...req.body,
        ...EndTime
    }
    order.destroy({ where: idRoom }).then(del => {
        order.create(data).then(result => {
            res.send(result)
        })
    })
}

exports.checkout = (req, res) => {
    order.update(
        req.body,
        { where: req.params }
    ).then(webtoon => {
        res.send({
            message: "success",
            ...req.body
        })
    })
}

exports.updateorder = (req, res) => {
    var time = moment().format("Y-MM-DD hh:mm:ss");
    order.update(
        { is_booked: 0 },
        {
            where: {
                order_end_time: {
                    [Op.lte]: new Date().toISOString()
                },
                is_booked: true
            }
        }
    ).then((result) => {
        res.send(time);
    })
}