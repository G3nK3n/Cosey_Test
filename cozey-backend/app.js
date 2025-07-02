var express = require('express')
var app = express()

const OrdersData = require('./Orders.json')
const ItemsData = require('./items.json')


app.use(express.json());


app.get('/getDates', async (req, res) => {

    res.status(200).json(OrdersData)

})

app.get('/getItemsList', async (req, res) => {

    res.status(200).json(ItemsData)

})

app.listen(5000, function () {
    console.log('Server is running...');
});