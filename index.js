import express from "express";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 3000;

const favorites = {
  color: "blue",
  food: "tacos",
  drink: "iced tea",
  animal: "dogs",
  movie: "Tangled",
  book: "Any book by Jules Verne",
  song: "fractures by Illenium",
  sport: "Formula 1 (F1)",
  subject: "math",
  season: "summer",
};

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

  if (type.includes("joke")) {
    type = "tell me a joke";
    reqUrl = "http://official-joke-api.appspot.com/random_joke";
  } else if (type.includes("activity")) {
    type = "give me an activity";
    reqUrl = "http://www.boredapi.com/api/activity/";
  } else if (type.includes("fact")) {
    type = "give me a fact";
    reqUrl = "https://uselessfacts.jsph.pl/random.json?language=en";
  } else if (type.includes("favorite")) {
    type = "tell me your favorite";
    let favorite = req.body.queryResult.parameters["favorite"];
    return res.status(200).send({
      fulfillmentMessages: [
        {
          text: {
            text: [
              "My favorite " + favorite + " is " + favorites[favorite] + ".",
            ],
          },
        },
      ],
    });
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

let processFact = (fact) => {
  return fact.text;
};

let processResponse = (type, response) => {
  if (type == "tell me a joke") {
    return processJoke(response);
  } else if (type == "give me an activity") {
    return processActivity(response);
  } else if (type == "give me a fact") {
    return processFact(response);
  } else {
    return "Invalid type";
  }
};
