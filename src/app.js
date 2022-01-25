const express = require("express");
const path = require("path");
const res = require("express/lib/response");
const hbs = require("hbs");
const app = express();
const port = 8800;
const staticPath = path.join(__dirname, "../public");
const imagePath = path.join(__dirname, "../public/images");
const cssPath = path.join(__dirname, "../public/css");
const jsPath = path.join(__dirname,"../public/js");
const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//set view engin as hbs, pug or ejs
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);
//change default views to new folder name
app.set("views",templatePath);

app.use(express.static(imagePath));
app.use(express.static(cssPath));
app.use(express.static(jsPath));
app.use(express.static(staticPath));

app.get("/", (request, response) =>{
    // response.send("Home page");
    response.render("index");
});
app.get("/index", (request, response) =>{
    // response.send("Home page");
    response.render("index");
});

app.get("/about", (request, response) =>{
    // response.send("About us page");
    response.render("about",{
        skilllist : "c#, D3js, PHP, Oracle, SQL Server, MySql"
    });
    });

app.get("/wether", (request, response) =>{
    response.render("wether");
    });

app.get("*", (request, response) =>{
    response.render("error");
    });
app.listen(port, ()=>{
    console.log("Server started on port 8800");
});