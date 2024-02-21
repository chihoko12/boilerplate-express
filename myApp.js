require('dotenv').config()
let express = require('express');
const req = require('express/lib/request');
let app = express();
// console.log("Hello World");

app.route('/name').get((req,res) => {
    res.json({'name' : req.query.first + " " + req.query.last});
}).post()

app.get('/name', (req,res) => {
    res.json({'name' : req.query.first + " " + req.query.last});
})

app.get('/:word/echo', (req,res) => {
    res.json({'echo' : req.params.word});
})

app.get('/now', (req,res,next) => {
    req.time = new Date().toString();
    next();
}, (req,res) => {
    res.json({'time': req.time});
})


app.use('/', (req,res,next)=> {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})

app.get("/", function(req,res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.use('/public', express.static(__dirname + '/public') )

app.get('/json', function(req,res) {
    if(process.env.MESSAGE_STYLE == 'uppercase') {
        res.json({"message": "Hello json".toUpperCase()});
    } 
    else {
        res.json({"message": "Hello json"});
    }
})

app.get("/",function(req,res) {
    res.send('Hello Express');
});


module.exports = app;
