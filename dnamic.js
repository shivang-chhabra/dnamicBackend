// var fs = require('fs');
// var https = require('https');
//Node.js Function to save image from External URL.
const http = require("http");
const fs = require("fs");
const jsonans = require("./data.json");
const server = http.createServer(function (req, res) {
    res.writeHead(200, { "content-type": "text/html" });
    // const json = fs.readFileSync("./data.json");
    // const jsonans = "" + json;
    
    var path = req.url;
    var id = path.split("=");
    if (path == "/product?id="+id[1]) {
        
        var html = fs.readFileSync("./template-product.html");
        var htmlans = "" + html;
        
             htmlans =htmlans.replace(/{%PRODUCTNAME%}/g, jsonans[id[1]].productName);
        htmlans = htmlans.replace(/{%IMAGE%}/g, jsonans[id[1]].image);
        htmlans = htmlans.replace(/{%NUTRIENTS%}/g, jsonans[id[1]].nutrients)
        htmlans = htmlans.replace(/{%FROM%}/g, jsonans[id[1]].from);
        htmlans = htmlans.replace(/{%PRICE%}/g, jsonans[id[1]].price);
        htmlans = htmlans.replace(/{%QUANTITY%}/g, jsonans[id[1]].quantity);
        if (jsonans[id[1]].organic == false) {
                htmlans = htmlans.replace(/{%NOT_ORGANIC%}/g, "not-organic");
            } 
        htmlans = htmlans.replace(/{%DESCRIPTION%}/g, jsonans[id[1]].description);
        
        res.write(htmlans);
        res.end("welcome to products");

    }
    else if (path === "/" || path === "/overview" || path == "/home") {
        var html = fs.readFileSync("./template-card.html");
        var input = "" + html;
        var htmlans = input;
        var output='';
        for (var i = 0; i < jsonans.length; i++) {
            htmlans = htmlans.replace(/{%PRODUCTNAME%}/g, jsonans[i].productName);
            htmlans = htmlans.replace(/{%IMAGE%}/g, jsonans[i].image);
           // htmlans = htmlans.replace(/{%NUTRIENTS%}/g, jsonans[i].nutrients)
            htmlans = htmlans.replace(/{%ID%}/g, jsonans[i].id);
            htmlans = htmlans.replace(/{%PRICE%}/g, jsonans[i].price);
           htmlans = htmlans.replace(/{%QUANTITY%}/g, jsonans[i].quantity);
            if (jsonans[i].organic == false) {
                htmlans = htmlans.replace(/{%NOT_ORGANIC%}/g,"not-organic");
            }
                        output += htmlans;
            htmlans = input;
        }
        var html1 = fs.readFileSync("./template-overview.html");
        var abc = "" + html1;
        //console.log(abc);
        abc =abc.replace(/{%PRODUCT_CARDS%}/g, output);
        res.write(abc);
        res.end("welocme to " + path);
    }
    else if (path === "/api") {
        var file=fs.readFile("./data.json",function(err,data){
            res.write(data);
            res.end("welcome to api ")
        })
        
        }
    else {
        res.end("page not found");
    }
   // res.write(file);
   //nod res.end("Response ended");
});
var port = process.env.PORT||80;
server.listen(port);
console.log("Server has started");
