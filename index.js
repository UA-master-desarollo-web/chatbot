const express = require("express");
// will use this later to send requests
const http = require("http");
// import env variables
require("dotenv").config();

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

app.post("/random_joke", (_, res) => {
  const reqUrl = encodeURI("http://official-joke-api.appspot.com/random_joke");
  http.get(
    reqUrl,
    (resp) => {
      let data = "";

      // A chunk of data has been recieved.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      resp.on("end", () => {
        res.status(200).send(JSON.parse(data));
      });
    },
    (err) => {
      console.log("Error: ", err);
    }
  );
});

app.post("/random_activity", (_, res) => {
  const reqUrl = encodeURI("http://www.boredapi.com/api/activity/");
  http.get(
    reqUrl,
    (resp) => {
      let data = "";

      // A chunk of data has been recieved.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      resp.on("end", () => {
        res.status(200).send(JSON.parse(data));
      });
    },
    (err) => {
      console.log("Error: ", err);
    }
  );
});
