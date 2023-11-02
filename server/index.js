const express = require("express");
const app = express(); // create express app
const path = require("path");

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

// const hashedPasswords = [
//     {salt: "2q@ugZvm+R!J", password: "1bede1cf7960a1c867308fa2e6683a464215fe5cdd35f348271ef5a37c019597"},
//     {salt: "0dv0XHDyrKik", password: "f437ea8a7446c2329903b45902bc52ba17b43a492ca73b0a8e033c66f56831bd"},
//     {salt: "GcOhI0H!gWls", password: "292b178dd6b39bfc08d43ec008aa649a7bf00e1f99e30d567000c0c909b625b5"},
//     {salt: "5hAi&2!4dmK3", password: "2b949cffa348076c48575299ee27b69fae1c91b67cc2a2498e19ef0cf5e68349"},
//     {salt: "lXW_S0QwpEgq", password: "c9bea8312258f6e4964034ea5125a9de3f796d836ca8599d58cee5c7ed78ada5"},
//     {salt: "luEWtM0IZtO2", password: "0e14678ac6ee6f563438dce9d79cf4bf4047bffef83afc423027618a6f0d0b0e"}
// ]

// const plaintextPasswords = [
//     {password: "justAnotherPassword"},
//     {password: "elliotaldersonfsociety"},
//     {password: "123"},
//     {password: "sup3rc0mpl1cat3dpass"},
//     {password: "correct staple battery horse"},
//     {password: "testPrvaLozinka"}
// ]

// const comments = [
//     {time: "2023-11-02 17:50:32.602354", text: "Just an ordinary comment"},
//     {time: "2023-11-02 17:51:20.41099", text: "Ovaj komentar također nije iskoristio ranjivost, ali sljedeći bi mogao"},
//     {time: "2023-11-02 20:09:52.629581", text: "Pogledajte sliku mojih novih tenisica <img src='laznilink' onerror=\"alert('Ovdje bi mogao biti vaš cookie')\" />"}
// ]

// app.get("/api/hashedPasswords", async (req, res) => {
//     return res.json(hashedPasswords);
// });

// app.get("/api/plaintextPasswords", async (req, res) => {
//     return res.json(plaintextPasswords);
// });

// app.get("/api/comments", async (req, res) => {
//     return res.json(comments);
// });




// start express server on port 5000
app.listen(5000, () => {
    console.log("server started on port 5000");
});