
var serverURL = 'http://localhost:8081'
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
              if (value == "date" || value == "amout" || value == "type") {
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

function CreateDonation(id_sending,id_receiving,amount,date) {
  $.ajax({
    type: 'PUT',
    url: serverURL + '/WebInformation',
    headers: { "X-HTTP-Method-Override": "PUT" },
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(({ "id_sending": id_sending,"id_receiving":id_receiving,"amount": amount,"date":date,"type":"1"})),
    success: function (results) {
      alert(results)
   
    },
    error: function (data) {
      notifyServerError()
    },
   
  });


}