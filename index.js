// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  let dateUTC = "";
  let timestamp = 0;
  if(/^\d{13}$/.test(req.params.date)) {
    timestamp = parseInt(req.params.date);
    dateUTC = new Date(timestamp).toUTCString();
  } else if(!req.params.date) {
    timestamp = Date.now();
    dateUTC = new Date(timestamp).toUTCString;
  } else {
    let dateSplit = req.params.date.split("-");
    const [year, month, day] = dateSplit.map(Number);
    dateUTC = new Date(Date.UTC(year, month - 1, day)).toUTCString();
    timestamp = Date.parse(dateUTC);
  };

  res.json({
    "unix": timestamp,
    "utc": dateUTC
  });
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
