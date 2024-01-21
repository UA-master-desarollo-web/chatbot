import express from "express";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Server is working.");
});

app.listen(port, () => {
  console.log(`🌏 Server is running at http://localhost:${port}`);
});

app.post("/", (req, res) => {
  let type = req.body.queryResult.intent.displayName;
  let reqUrl = "";

  if (type == "tell me a joke") {
    reqUrl = "http://official-joke-api.appspot.com/random_joke";
  } else if (type == "give me an activity") {
    reqUrl = "http://www.boredapi.com/api/activity/";
  } else {
    res.status(400).send("Invalid type");
  }

  fetch(reqUrl, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((json) => {
      res.status(200).send(json);
    })
    .catch((error) => res.status(400).send("Error" + error));
});
