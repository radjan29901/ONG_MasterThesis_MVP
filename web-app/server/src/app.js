const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var network = require('./fabric/network.js');
const { stdout } = require('process');

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

app.get('/checkAuth', (req, res) => {
  network.checkAuth()
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

app.post('/create_user', (req, res) => { 
  var appAdmin=req.body.appAdmin;
  var appAdminSecret=req.body.appAdminSecret;
  var username=req.body.userName;
  var orgMSPID=req.body.orgMSPID;
  var caName=req.body.caName;
  var exec = require('child_process').exec, child;
var arguments=appAdmin+" "+appAdminSecret+" "+username+" "+orgMSPID+" "+caName
exec('sudo node enrollAdmin.js '+arguments,
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
 return stdout;
})
function getDate(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + '/' + mm + '/' + yyyy;
  return today;
}
app.post('/CreateDonation', (req, res) => { 
  console.log(req.body);
  network.queryAllDonations()
    .then((response) => { 
      console.log(response);
      var donationRecord = JSON.parse(response);
      var numDonation = donationRecord.length;
      var newKey = 'DONATION' + numDonation;           

      var destinataire='ONG'
      network.createDonation(newKey, destinataire, req.body.amount, getDate(),'1')
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