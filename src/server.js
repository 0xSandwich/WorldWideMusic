const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql')
const fetch = require('cross-fetch')


const connection = mysql.createConnection({
    host : 'sandbox.matthieuvidal.fr',
    user : 'worldwidemusic', //here i wrote wrong username,,it was 'root'. problem solved.
    password : 'GPtFpBerNIEEdtpu',
    database : 'musicdata'
}) ;

connection.connect(err => {
    if(err) {
        return err
    }
})

app.use(cors({credentials: true, origin: true}));

// Get Top Albums
app.get('/gettopcharts', (req,res) =>{
    const {decade} = req.query
    const SELECT_COUNTRY = `SELECT * FROM topalbums WHERE decade = '${decade}' `
    connection.query(SELECT_COUNTRY, (err, results) => {
        if (err){ 
            return res.send(err)
        }
        else{
            return res.json({
                data: results
            })
        }
    })
})

app.get('/getcountry', (req,res) =>{
    const {decade, country} = req.query
    const SELECT_COUNTRY = `SELECT * FROM albums WHERE decade = '${decade}' AND country='${country}' `
    connection.query(SELECT_COUNTRY, (err, results) => {
        if (err){ 
            return res.send(err)
        }
        else{
            return res.json({
                data: results
            })
        }
    })
})



// Get best genre by country

app.get('/getbestgenre',(req,res) => {
    const {decade} = req.query
    let query = `https://sandbox.matthieuvidal.fr/wwmserv/json.php?decade='${decade}'&type=object`
    fetch(query)
    .then(response => response.json())
    .then((data)=> {
        return res.json(data)
    })
    .catch(err => console.log(err));
})

// Get number of albums of each genre
app.get('/getalbumworld',(req,res) => {
    const {decade} = req.query
    let query = `https://sandbox.matthieuvidal.fr/wwmserv/json.php?decade='${decade}'&total`
    fetch(query)
    .then(response => response.json())
    .then((data)=> {
        return res.json(data)
    })
    .catch(err => console.log(err));
})


app.listen(4000,() => {
    console.log('Server listening on port 4000')
})