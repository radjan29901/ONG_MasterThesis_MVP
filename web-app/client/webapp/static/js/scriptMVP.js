

var serverURL = 'http://localhost:8081'

function auth() {
  var username = document.getElementById("login").value
  var password = document.getElementById("password").value
  $.ajax({
    type: 'POST',
    url: serverURL + '/auth',
    headers: { "X-HTTP-Method-Override": "PUT" },
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(({ "username": username, "password": password })),
    success: function (results) {
      alert(results)

    },
    error: function (data) {
      alert("error")
    },

  });
}
function send_tx() {


  var amount = document.getElementById("amount").value


  $.ajax({
    type: 'POST',
    url: serverURL + '/CreateDonation',
    headers: { "X-HTTP-Method-Override": "PUT" },
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(({ "amount": amount })),
    success: function (results) {
      alert(results)

    },
    error: function (data) {
      alert("error")
    },

  });
};

function changeType(id_query,new_type){

  $.ajax({
    type: 'POST',
    url: serverURL + '/change_type',
    headers: { "X-HTTP-Method-Override": "PUT" },
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(({ "id": id_query,"type":new_type })),
    success: function (results) {
      alert(results)

    },
    error: function (data) {
      alert("error")
    },

  });
};
function queryAllDonations(donator = true) {
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
            const k=results[i]['Key']
            for (var value in results[i][key]) {
              if (donator) {
                if (value == "date" || value == "amout" || value == "amount") {
                  td_value = document.createElement('TD')
                  td_value.innerText = results[i][key][value]
                  tr.appendChild(td_value)
                  console.log(value)
                  console.log(results[i][key][value]);

                }
              }
              else {
                if (value == "date" || value == "amout" || value == "amount" || value == "type") {
                  td_value = document.createElement('TD')
                  td_value.innerText = results[i][key][value]
                  tr.appendChild(td_value)
                  console.log(value)
                  console.log(results[i][key][value]);
                  if (value == "type") {
                    var btn = document.createElement('button')
                    btn.className="btn btn-success"
                    btn.innerText="Valid"
                    var td_btn = document.createElement('TD')
                    td_btn.appendChild(btn)
                    td_btn.onclick= function() {changeType(k,"2");}
                    tr.appendChild(td_btn)
                  }
                }
              }
            }
          }
          else {
            var td_key = document.createElement('TD')
            if (donator == false) {


            }
            td_key.innerText = results[i][key]
            tr.appendChild(td_key)


          }
        }
        tableBody.appendChild(tr)
      }

    },
    error: function (data) {
      alert("error, service respond :" + data)
    }
  })
};


function queryAllDonationsAdmin(donator = true) {
  $.ajax({
    type: 'GET',
    url: serverURL + '/queryAllDonationsAdmin',
    contentType: 'application/json',
    success: function (results) {
      var tableBody = document.getElementById("transactionsType")
      for (i = 0; i < results.length; i++) {
        var tr = document.createElement('TR'); // this should be inside the first loop
        for (var key in results[i]) {

          if (key == "Record") {
            const k=results[i]['Key']
            for (var value in results[i][key]) {
              if (donator) {
                if (value == "date" || value == "amout" || value == "amount") {
                  td_value = document.createElement('TD')
                  td_value.innerText = results[i][key][value]
                  tr.appendChild(td_value)
                  console.log(value)
                  console.log(results[i][key][value]);

                }
              }
              else {
                if (value == "date" || value == "amout" || value == "amount" || value == "type") {
                  td_value = document.createElement('TD')
                  td_value.innerText = results[i][key][value]
                  tr.appendChild(td_value)
                  console.log(value)
                  console.log(results[i][key][value]);
                  if (value == "type") {
                    var btn = document.createElement('button')
                    btn.className="btn btn-success"
                    btn.innerText="Valid"
                    var td_btn = document.createElement('TD')
                    td_btn.appendChild(btn)
                    td_btn.onclick= function() {changeType(k,"2");}
                    tr.appendChild(td_btn)
                  }
                }
              }
            }
          }
          else {
            var td_key = document.createElement('TD')
            if (donator == false) {


            }
            td_key.innerText = results[i][key]
            tr.appendChild(td_key)


          }
        }
        tableBody.appendChild(tr)
      }

    },
    error: function (data) {
      alert("error, service respond :" + data)
    }
  })
};


function get_auth_info() {
  $.ajax({
    type: 'GET',
    url: serverURL + '/get_auth_info',
    contentType: 'application/json',
    success: function (results) {
      var appAdmin = results['appAdmin']
      var appAdminSecret = results['appAdminSecret']
      var orgMSPID = results['orgMSPID']
      var caName = results['caName']
      var username = results['userName']

      document.getElementById('appAdmin').innerHTML = '<b>appAdmin</b> : ' + appAdmin
      document.getElementById('appAdminSecret').innerHTML = '<b>appAdminSecret</b> : ' + appAdminSecret
      document.getElementById('OrgMSPID').innerHTML = '<b>orgMSPID</b> : ' + orgMSPID
      document.getElementById('caName').innerHTML = '<b>caName</b> : ' + caName
      document.getElementById('username').innerHTML = '<b>userName</b> : ' + username

    },
    error: function (data) {
      alert("error, service respond :" + data)
    }
  })
};


function create_user() {
  var appAdmin = document.getElementById("appAdmin").value
  var appAdminSecret = document.getElementById("appAdminSecret").value
  var userName = document.getElementById("userName").value
  var orgMSPID = document.getElementById("orgMSPID").value
  var caName = document.getElementById("caName").value
  $.ajax({
    type: 'POST',
    url: serverURL + '/create_user',
    headers: { "X-HTTP-Method-Override": "PUT" },
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(({ "appAdmin": appAdmin, "appAdminSecret": appAdminSecret, "userName": userName, "orgMSPID": orgMSPID, "caName": caName })),
    success: function (results) {

      alert(results)
    },
    error: function (data) {
      alert("error, service respond :" + data)
    }
  })
};