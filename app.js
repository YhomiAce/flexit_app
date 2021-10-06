const express = require('express');
require('dotenv').config();
const db = require("./config/db");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const session = require("express-session");
const flash = require("express-flash-messages");

const app = express();
const server = http.createServer(app);

const Routes = require("./routes");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
      },
    })
  );
app.use(flash());


app.use(morgan('dev'))
// set up public folder
app.use(express.static(path.join(__dirname, "public")));
// Static Files
// dashboard 
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/images', express.static(__dirname + 'public/images'));

app.use("/", Routes);

// 404 not found
app.use(function (req, res) {
    res.status(404).render('base/404');
});

const PORT = process.env.PORT || 7000;
server.listen(PORT, console.log(`Server started on ${PORT}`));

