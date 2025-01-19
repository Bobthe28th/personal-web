const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const exphbs = require("express-handlebars")
const app = express();
const args = process.argv.slice(2);
const useHttps = args.includes("--https");

const getPort = () => {
    const portArg = args.find(arg => arg.startsWith('--port='));
    if (portArg) {
      return portArg.split('=')[1]; // Extract the value after the '=' sign
    }
    return 80; // Return null if no port argument is provided
};

const port = getPort();
http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
}).listen(port, () => {
    console.log(`HTTP Server running on port ${port}`);
});

if (useHttps) {
    const options = {
        key: fs.readFileSync('/etc/letsencrypt/live/bobthe28th.me/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/bobthe28th.me/fullchain.pem'),
    };
    https.createServer(options, app).listen(443, () => {
        console.log('HTTPS Server running on port 443');
    });
}

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get('/', (req, res) => {
    res.render('home', {});
});

app.get("*", function (req, res) {
    res.redirect("/");
});