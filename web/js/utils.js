// Tabulate 2D data
function tabulate(arr, element) {

  var tableDiv = document.getElementById(element);
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  table.border = '1';
  table.appendChild(tableBody);

  var heading = [];
  heading[0] = "Acc.";
  heading[1] = "Wallet Addr.";
  heading[2] = "Trxs";
  heading[3] = "ETH";
  //heading[4] = "MED";

  var data = [];

  for (i = 0; i < arr.length; i++)
      //data[i] = new Array(i, web3.eth.accounts[i], web3.eth.getTransactionCount(web3.eth.accounts[i]), arr[i], (arr[i] * 6088));
      data[i] = new Array(i, web3.eth.accounts[i], web3.eth.getTransactionCount(web3.eth.accounts[i]), arr[i]);

  // Table cols
  var tr = document.createElement('tr');
  tableBody.appendChild(tr);
  for (i = 0; i < heading.length; i++) {
      var th = document.createElement('th');
      th.width = '75';
      th.appendChild(document.createTextNode(heading[i]));
      tr.appendChild(th);
  }

  // Table rows
  for (i = 0; i < data.length; i++) {
      tr = document.createElement('tr');
      for (j = 0; j < data[i].length; j++) {
          var td = document.createElement('td');
          td.appendChild(document.createTextNode(data[i][j]));
          tr.appendChild(td);
      }
      tableBody.appendChild(tr);
  }
  tableDiv.appendChild(table);
}

// List data
function list(arr, element) {

  var html = '';
 
  for (var i=0; i<arr.length; i++)
     html += '<div>' + arr[i] + '</div>';
  
  var data = document.getElementById(element);
  data.innerHTML = html;
}