const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const exphbs = require("express-handlebars")
const app = express();
const port = parseInt(process.argv[2] ?? 3000);

http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
}).listen(80);

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/bobthe28th.me/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/bobthe28th.me/fullchain.pem'),
};

https.createServer(options, app).listen(443, () => {
    console.log('HTTPS Server running on port 443');
});

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

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });

app.get("*", function (req, res) {
    res.redirect("/");
});