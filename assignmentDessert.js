const express = require('express');
const bodyParser = require("body-parser");
const DessertOrder = require("./assignment1Dessert");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("www"));

app.get("/users/:uname", (req, res) => {
    res.end("Hello " + req.params.uname);
});

let oDessertOrders = {};
app.post("/sms", (req, res) => {
    let sFrom = req.body.From || req.body.from;
    if(!oDessertOrders.hasOwnProperty(sFrom)){
        oDessertOrders[sFrom] = new DessertOrder();
    }
    let sMessage = req.body.Body|| req.body.body;
    let aReply = oDessertOrders[sFrom].handleInput(sMessage);
    if(oDessertOrders[sFrom].isDone()){
        delete oDessertOrders[sFrom];
    }
    res.setHeader('content-type', 'text/xml');
    let sResponse = "<Response>";
    for(let n = 0; n < aReply.length; n++){
        sResponse += "<Message>";
        sResponse += aReply[n];
        sResponse += "</Message>";
    }
    res.end(sResponse + "</Response>");
});

var port = process.env.PORT || parseInt(process.argv.pop()) || 3002;

app.listen(port, () => console.log('Example app listening on port ' + port + '!'));
