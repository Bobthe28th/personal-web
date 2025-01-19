const express = require('express');
const exphbs = require("express-handlebars")
const app = express();
const port = parseInt(process.argv[2] ?? 3000);

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.get("*", function (req, res) {
    res.redirect("/");
});