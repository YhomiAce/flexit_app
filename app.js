const express = require('express');
require('dotenv').config();
const db = require("./config/db");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(morgan('dev'))
// set up public folder
app.use(express.static(path.join(__dirname, "public")));
// Static Files
// dashboard 
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/images', express.static(__dirname + 'public/images'));

app.get("/", (req, res) =>{
    res.render("index");
})

const PORT = process.env.PORT || 7000;
server.listen(PORT, console.log(`Server started on ${PORT}`));

