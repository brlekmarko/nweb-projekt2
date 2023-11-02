const express = require("express");
const app = express(); // create express app
const path = require("path");
const { client } = require("./database/client");

client.connect();

//cors
const cors = require("cors");
app.use(cors());

// configure path
app.use(express.static(path.join(__dirname, "public")));

// add home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// add xss route
app.get("/xss", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "xss.html"));
});

// add sensitive data exposure route
app.get("/sensitive-data", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "sensitive-data.html"));
});

/////////////////////////
// database reading routes
/////////////////////////
app.get("/api/hashedPasswords", async (req, res) => {
    try {
        let result = await client.query("SELECT * FROM hashedPasswords");
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get("/api/plaintextPasswords", async (req, res) => {
    try {
        let result = await client.query("SELECT * FROM plaintextPasswords");
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get("/api/comments", async (req, res) => {
    try {
        let result = await client.query("SELECT * FROM comment");
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});




// start express server on port 5000
app.listen(5000, () => {
    console.log("server started on port 5000");
});