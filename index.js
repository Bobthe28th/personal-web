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
        return portArg.split('=')[1];
    }
    return 80;
};

const port = getPort();


if (useHttps) {
    http.createServer((req, res) => {
        res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
        res.end();
    }).listen(port, () => {
        console.log(`HTTP->HTTPS Server running on port ${port}`);
    });
    const options = {
        key: fs.readFileSync('/etc/letsencrypt/live/bobthe28th.me/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/bobthe28th.me/fullchain.pem'),
    };
    https.createServer(options, app).listen(443, () => {
        console.log('HTTPS Server running on port 443');
    });
} else {
    http.createServer(app).listen(port, () => {
        console.log(`HTTP Server running on port ${port} view on http://localhost:3000/?fake=true`);
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