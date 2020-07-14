const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var network = require('./fabric/network.js');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())



app.get('/get_auth_info', (req, res) => {
  network.get_auth_info()
    .then((response) => {      
       
        res.send(response)
      });
})

app.get('/queryAllDonations', (req, res) => {
  network.queryAllDonations()
    .then((response) => {      
        var carsRecord = JSON.parse(response);        
        res.send(carsRecord)
      });
})

app.post('/auth', (req, res) => { 
  var username=req.body.username;
  var password=req.body.password;
  console.log(username);
  console.log(password);

  network.auth(username,password)
    .then((response) => { 
       
    })  
})

app.post('/CreateDonation', (req, res) => { 
  console.log(req.body);
  network.queryAllDonations()
    .then((response) => { 
      console.log(response);
      var donationRecord = JSON.parse(response);
      var numDonation = donationRecord.length;
      var newKey = 'DONATION' + numDonation;           


      network.createDonation(newKey, req.body.id_sending, req.body.id_receiving, req.body.amount, req.body.date,req.body.type)
      console.log("has been send!!!!!!!!!!!!!!")
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