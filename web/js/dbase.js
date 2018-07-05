// $ sudo npm install mysql --save
// $ sudo mysql 
// mysql> GRANT ALL PRIVILEGES ON lancor.* TO 'paul'@'localhost';
// mysql> SHOW GRANTS FOR CURRENT_USER;
// mysql> CREATE DATABASE <name>
// mysql> show databases
// mysql> show tables
// mysql> drop table <name>


// $ node
// > module.paths
var mysql = require('mysql');

// Get transaction details
function getTransactionDetails() {
    
    var tdets = [];
    div = 1e18;
  
    //if (trx != null || rcpt != null) {
      tdets.push('hash');
      tdets.push('nonce');
      tdets.push('blockHash');
      tdets.push('blockNumber');
      tdets.push('trxIndex');
      tdets.push('0x06c5a9b2aab1e84a0404d328308d94800b49cfbc');
      tdets.push('0xe2c55ca12e8b7e4dc3f07b355cc808bb576b552d');
    //  tdets.push(trx.to);
     // tdets.push(trx.value / div +' ETH');
      // 1 eth = 1e9 Gwei. 20 Gwei (price) per gas (unit).
    //  tdets.push(trx.gasPrice); // 1 Wei 
     // tdets.push(trx.gas); // 2000000
     // tdets.push(rcpt.gasUsed); // 21000 is the gas limit for standard transactions
     // tdets.push(trx.input);
   // }
  
    return tdets;
  }

  // https://techbrij.com/convert-column-to-row-javascript-array-pivot
  function getPivotArray(dataArray, rowIndex, colIndex, dataIndex) {
    //Code from https://techbrij.com
    var result = {}, ret = [];
    var newCols = [];
    for (var i = 0; i < dataArray.length; i++) {

        if (!result[dataArray[i][rowIndex]]) {
            result[dataArray[i][rowIndex]] = {};
        }
        result[dataArray[i][rowIndex]][dataArray[i][colIndex]] = dataArray[i][dataIndex];

        //To get column names
        if (newCols.indexOf(dataArray[i][colIndex]) == -1) {
            newCols.push(dataArray[i][colIndex]);
        }
    }

    newCols.sort();
    var item = [];

    //Add Header Row
    item.push('Item');
    item.push.apply(item, newCols);
    ret.push(item);

    //Add content 
    for (var key in result) {
        item = [];
        item.push(key);
        for (var i = 0; i < newCols.length; i++) {
            item.push(result[key][newCols[i]] || "-");
        }
        ret.push(item);
    }
    return ret;
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

//function conn() {
    
    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'paul',
        //password: "mind2Games",
        database: 'medici'
    });

    conn.connect(function(err) {
        if (err) throw err;
            console.log("Connected!");
    });

    //var sql_drop_table = "DROP TABLE accounts";
    //conn.query(sql_drop_table, function (err, result) {
    //    if (err) throw err;
    //    console.log("Table 'accounts' deleted");
    //});

    //var sql = "CREATE DATABASE IF NOT EXISTS medici";
    //conn.query(sql, function (err, result) {
    //    if (err) throw err;
    //    console.log("Database: 'medici' created");
    //});

    // https://www.w3schools.com/sql/sql_insert.asp
    var sql_create_table = 'CREATE TABLE IF NOT EXISTS accounts '+
              '(ID int NOT NULL AUTO_INCREMENT, created DATETIME, hash VARCHAR(255), nonce VARCHAR(255), blockHash VARCHAR(255), '+ 
                                               'blockNumber VARCHAR(255), trxIndex VARCHAR(255), contAddr VARCHAR(255), addr VARCHAR(255), '+ 
                                               'PRIMARY KEY (ID))';
    console.log(sql_create_table);
    conn.query(sql_create_table, function (err, result) {
    if (err) throw err;
        console.log("Table: 'accounts' created");
    });

    var d = getTransactionDetails();
   
    var sql_insert = 'INSERT INTO accounts (created, hash, nonce, blockHash, blockNumber, trxIndex, contAddr, addr) '+ 
                     'VALUES ("'+new Date().toLocaleString()+'", "'+d[0]+'", "'+d[1]+'", "'+d[2]+'", "'+d[3]+'", "'+d[4]+'", "'+d[5]+'", "'+d[6]+'")';
    console.log(sql_insert);
    conn.query(sql_insert, function(err, result) {
        if (err) throw err;
        //console.log(result);
    });

    conn.query("SELECT * FROM accounts", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });

    // Get days since account created (i.e., purchased Medici tokens) => countdown to Stake Reward
    // Testing with 9 days static here!
    var sql_diffdays = 'SELECT addr, DATEDIFF("'+(addDays(new Date(), 9).toLocaleString())+'", created) daysLeft FROM accounts ORDER BY daysLeft DESC';
    console.log(sql_diffdays);
    conn.query(sql_diffdays, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
      
    conn.end();
//}