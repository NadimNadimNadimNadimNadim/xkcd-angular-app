const express = require("express");
const fetch = require("node-fetch");

const app = express();
const URL_START = "http://xkcd.com/";
const URL_END = "/info.0.json";

// Proxy server for xkcd requests to add header to allow Cross-Origin requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/current", async (req, res, next) => {
  try {
    let response = await fetch(URL_START + URL_END);
    let json = await response.json();
    res.json(json);
  } catch (error) {
    console.error(error);
  }
});
app.get("/:num", async (req, res, next) => {
  try {
    let response = await fetch(URL_START + req.params.num + URL_END);
    let json = await response.json();
    res.json(json);
  } catch (error) {
    console.error(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
