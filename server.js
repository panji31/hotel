/*body parser*/
const bodyParser = require("body-parser");
/*jwt*/
const jwt = require('jsonwebtoken');
/*axios*/
const axios = require('axios');
/*group routes*/
require('express-group-routes');
/*express*/
const express = require("express");
const port = 5000;
const app = express();
/*model*/
const users = require("./controllers/users");
const orders = require("./controllers/orders");
const customer = require("./controllers/customers");

var moment = require('moment');
moment().format();

const path = require("path");
const md5 = require('md5');
var fs = require('fs');
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, res, cb) {
        cb(null, md5(Math.random() * (12345678654 - 0) + 1) + path.extname(res.originalname));
    }
})
var upload = multer({ storage });
function random(low, high) {
    return Math.random() * (high - low) + low
}


//middlewares
const { authenticated } = require('./middleware');

app.use(bodyParser.json());
app.use('/static', express.static('uploads'));
/*========================================================================*/

//app.post('/upload', upload.single('fileData'), customer.insertCustomer);

app.group("/api/v2", (router) => {

    router.get('/orders', orders.index);
    router.get('/orders?is_booked=true', orders.index);
    router.post('/orders', orders.checkin);
    router.put('/orders/:idroom', orders.checkout);
    router.get('/orderupdate', orders.updateorder);

    router.get('/rooms', users.getRoom);
    router.post('/rooms', users.insertRoom);
    router.put('/rooms/:id', users.UpdateRoom);

    router.get('/customers', customer.getCustomer);
    //router.post('/customers', customer.insertCustomer); 
    router.post('/customers', upload.single('fileData'), customer.insertCustomer);
    router.put('/customers/:id', upload.single('fileData'), customer.updateCustomer);


    router.post('/login', users.signin);
    router.post('/register', users.register);


})

app.get('/', function (req, res) {
    //var time = moment().add(10, 'm').format("Y-MM-DD hh:mm:ss");
    var time = moment().format("Y-MM-DD hh:mm:ss");
    console.log(typeof time);

})

/*========================================================================*/

/*listing port*/
app.listen(port, () => console.log('connected'));  