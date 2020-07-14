

var serverURL = 'http://localhost:8081'

function auth(){
  var username=document.getElementById("login").value
  var password=document.getElementById("password").value
  $.ajax({
    type: 'POST',
    url: serverURL + '/auth',
    headers: { "X-HTTP-Method-Override": "PUT" },
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(({ "username": username,"password":password})),
    success: function (results) {
      alert(results) 
   
    },
    error: function (data) {
      alert("error")
    },
   
  });
}
function send_tx(){

  var id_receiver=document.getElementById("id_receiver").value
  var id_sender=document.getElementById("id_sender").value
  var amount=document.getElementById("amount").value
  var date= document.getElementById("date").value
  var type=document.getElementById("type").value
 
  $.ajax({
    type: 'POST',
    url: serverURL + '/CreateDonation',
    headers: { "X-HTTP-Method-Override": "PUT" },
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(({ "id_sending": id_sender,"id_receiving":id_receiver,"amount": amount,"date":date,"type":"1"})),
    success: function (results) {
      alert(results) 
   
    },
    error: function (data) {
      alert("error")
    },
   
  });
};


function queryAllDonations() {
  $.ajax({
    type: 'GET',
    url: serverURL + '/queryAllDonations',
    contentType: 'application/json',
    success: function (results) {
      var tableBody = document.getElementById("transactionsType")
      for (i = 0; i < results.length; i++) {
        var tr = document.createElement('TR'); // this should be inside the first loop
        for (var key in results[i]) {

          if (key == "Record") {

            for (var value in results[i][key]) {
              if (value == "date" || value == "amout" || value == "amount" ||value == "type") {
                td_value = document.createElement('TD')
                td_value.innerText = results[i][key][value]
                tr.appendChild(td_value)
                console.log(value)
                console.log(results[i][key][value]);
              }
            }

          }
          else {
            var td_key = document.createElement('TD')
            td_key.innerText = results[i][key]
            tr.appendChild(td_key)

          }
        }
        tableBody.appendChild(tr)
      }

    },
    error: function (data) {
      alert("error, service respond :"+data)
    }
  })
};



function get_auth_info() {
  $.ajax({
    type: 'GET',
    url: serverURL + '/get_auth_info',
    contentType: 'application/json',
    success: function (results) {
      var appAdmin=results['appAdmin']
      var appAdminSecret=results['appAdminSecret']
      var orgMSPID=results['orgMSPID']
      var caName=results['caName']
      var username= results['userName']
      
      document.getElementById('appAdmin').innerHTML='<b>appAdmin</b> : '+appAdmin
      document.getElementById('appAdminSecret').innerHTML='<b>appAdminSecret</b> : '+appAdminSecret
      document.getElementById('OrgMSPID').innerHTML='<b>orgMSPID</b> : '+orgMSPID
      document.getElementById('caName').innerHTML='<b>caName</b> : '+caName
      document.getElementById('username').innerHTML='<b>userName</b> : '+username

    },
    error: function (data) {
      alert("error, service respond :"+data)
    }
  })
};

