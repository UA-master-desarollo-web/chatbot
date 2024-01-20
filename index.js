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

let exampleReq = {
  responseId: "response-id",
  session: "projects/project-id/agent/sessions/session-id",
  queryResult: {
    queryText: "End-user expression",
    parameters: {
      "param-name": "param-value",
    },
    allRequiredParamsPresent: true,
    fulfillmentText: "Response configured for matched intent",
    fulfillmentMessages: [
      {
        text: {
          text: ["Response configured for matched intent"],
        },
      },
    ],
    outputContexts: [
      {
        name: "projects/project-id/agent/sessions/session-id/contexts/context-name",
        lifespanCount: 5,
        parameters: {
          "param-name": "param-value",
        },
      },
    ],
    intent: {
      name: "projects/project-id/agent/intents/intent-id",
      displayName: "matched-intent-name",
    },
    intentDetectionConfidence: 1,
    diagnosticInfo: {},
    languageCode: "en",
  },
  originalDetectIntentRequest: {},
};

app.post("/random", (req, res) => {
  let type = exammpleReq.intent.displayName;
  let reqUrl = "";

  if (type == "tellme a joke") {
    reqUrl = encodeURI("http://official-joke-api.appspot.com/random_joke");
  } else if (type == "give me an activity") {
    reqUrl = encodeURI("http://www.boredapi.com/api/activity/");
  } else {
    res.status(400).send("Invalid type");
  }

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
