const express = require("express");
const app = express();
app.use(express.static("public"));
const mysql = require("mysql");
const connection = mysql.createConnection(
    {host: "localhost", user: "root", password: "", database: ""});
app.use(express.urlencoded({ectended: false}));

// TOPルーティング
app.get("/", (req, res) => {
    res.render("top.ejs");
});

// INDEXルーティング
app.get("/index", (req, res) => {
    connection.query(
        "SELECT*FROM items", 
        (error, results) => {
            res.render("index.ejs", {items: results});
        }
    );
});

// NEWルーティング
app.get("/new", (req, res) => {
    res.render("new.ejs");
});

// createルーティング
app.post("/create", (req, res) => {
    connection.query(
        "INSERT INTO items(name) VALUES(?)",
        [req.body.itemName],
        (error, results) => {
            res.redirect("/index");
        }
    );
});

// deleteルーティング
app.post("/delete/:id", (req, res) => {
    connection.query(
        "DELETE FROM items WHERE id=?",
        [req.params.id],
        (error, results) => {
            res.redirect("/index");
        });
});

// editルーティング
app.get("/edit/:id", (req, res) => {
    connection.query(
        "SELECT*FROM items WHERE id=?",
        [req.params.id],
        (error, results) => {
            res.render("edit.ejs", {item: results[0]});
        }
    );
});

// updateルーティング
app.post("/update/:id", (req, res) => {
    connection.query(
        "UPDATE items SET name=? WHERE id=?",
        [req.body.itemName,req.params.id],
        (error, results) => {
            res.redirect("/index");
        }
    );

});


app.listen(3000);