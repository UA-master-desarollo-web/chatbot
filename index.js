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
      let responseText = processResponse(type, json);
      res.json({
        fulfillmentMessages: [
          {
            text: {
              text: [responseText],
            },
          },
        ],
      });
    })
    .then((json) => {
      res.status(200).send(json);
    })
    .catch((error) => res.status(400).send("Error" + error));
});

let processJoke = (joke) => {
  let setup = joke.setup;
  let punchline = joke.punchline;
  return setup + "\n" + punchline;
};

let processActivity = (activity) => {
  let activityName = activity.activity;
  let type = activity.type;
  let participants = activity.participants;
  return (
    activityName +
    "\n" +
    "Type: " +
    type +
    "\n" +
    "Participants: " +
    participants
  );
};

let processResponse = (type, response) => {
  if (type == "tell me a joke") {
    return processJoke(response);
  } else if (type == "give me an activity") {
    return processActivity(response);
  } else {
    return "Invalid type";
  }
};
