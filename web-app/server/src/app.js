const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var network = require('./fabric/network.js');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())




app.get('/queryAllDonations', (req, res) => {
  network.queryAllDonations()
    .then((response) => {      
        var carsRecord = JSON.parse(response);        
        res.send(carsRecord)
      });
})

app.get('/createDonation', (req, res) => { 
  console.log(req.body);
  network.queryAllDonations()
    .then((response) => {
      console.log(response);
      var carsRecord = JSON.parse(response);
      var numCars = carsRecord.length;
      var newKey = 'DONATION' + 10;           
      network.createDonation("DONATION10", "2", "3", "4", "5")
      .then((response) => {
        res.send(response)
      })
    })  
})

app.post('/changeCarOwner', (req, res) => {
  network.changeCarOwner(req.body.key, req.body.newOwner)
      .then((response) => {
        res.send(response)
      })
})

app.listen(process.env.PORT || 8081)