const express = require("express");
const fs = require("fs");
const app = express();

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(allowCrossDomain);

function covidData() {
  try {
    const csv = fs.readFileSync("./covid.csv", 'utf8');
    return csvJSON(csv);
  }
  catch (err) {
    console.log(err)
  }
}

app.get('/', function (req, res) {
  res.send(covidData())
});

app.listen(4000, function () {
  console.log('Server on..')
});

function csvJSON(csv){
  var lines=csv.split("\n");
  var result = [];
  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){
      var obj = {};
      var currentline=lines[i].split(",");
      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }
      result.push(obj);
  }
  return JSON.stringify(result); 
}

