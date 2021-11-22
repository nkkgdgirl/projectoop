const fs = require ('fs')
const express = require('express')
const app = express();

const Port = process.env.PORT || 8000;
app.listen(Port,() => console.log(` Server is running on ${Port}` ))

const cors = require('cors');
app.use(cors())

const csv = require('csv-parser')
const results = [];

app.get('/csv.csv' , function(req, res) {
    const results = [];
    fs.createReadStream('C:/Users/nkkgdgirl/nkk/Bend/covidd/csv/csv.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        res.send(results)
  });
})

console.log(results);