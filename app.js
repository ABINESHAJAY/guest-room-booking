const express = require("express");
const mysql = require("mysql");

const doenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");

const app = express();

doenv.config({
  path: "./.env",
});
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
});



db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connection Success");
  }
});
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


const location = path.join(__dirname, "./public");
app.use(express.static(location));
app.set("view engine", "hbs");


app.get("/login",(req,res) =>{
  res.render("login");
  });
app.get("/register",(req,res) =>{
res.render("register");
});
 
app.get("/home",(req,res) =>{
    res.render("home");
});
app.get("/booking",(req,res) =>{
  res.render("booking");
});

app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(3000, () => {
  console.log("Server Started @ Port 3000");
});

