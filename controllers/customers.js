const users = require('../models').users;
const room = require('../models').room;
const customer = require('../models').customer;
const jwt = require('jsonwebtoken');

exports.getCustomer = (req, res) => {
    customer.findAll().then(data => res.send(data))
}

exports.insertCustomer = (req, res) => {
    var idBody = req.body.id;
    var nameBody = req.body.name;
    var idcardBody = req.body.idcard;
    var phoneBody = req.body.phone_number;
    const data = { name: nameBody, idcard: idcardBody, phone_number: phoneBody, image: req.file.filename };

    customer.create(data).then(result => {
        res.send(result)
    })
}

exports.updateCustomer = (req, res) => {
    var idBody = req.body.id;
    var nameBody = req.body.name;
    var idcardBody = req.body.idcard;
    var phoneBody = req.body.phone_number;

    let = {};
    if (req.file.filename == '' || req.file.filename == null) {
        data = { name: nameBody, idcard: idcardBody, phone_number: phoneBody, image: 'download.jpg' };
    } else {
        data = { name: nameBody, idcard: idcardBody, phone_number: phoneBody, image: req.file.filename };
    }


    customer.update(
        data,
        { where: req.params }
    ).then(webtoon => {
        res.send({
            message: "success",
            ...req.body
        })
    })
}





