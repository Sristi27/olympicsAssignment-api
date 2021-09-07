const express = require("express");
const router = express.Router();
const Country = require("./../models/countries");
const Game = require("./../models/games");

// {name:"BasketBall",Player1:' ',Player2:'',date:''}

router.post("/addEvent", async (req, res) => {
  let team1id, team2id;
  const { name, team1, team2, date } = req.body;
  await Country.findOne({ name: team1 })
    .then((res) => {
      console.log(res._id), (team1id = res._id);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: "Country does not exist" });
    });

  await Country.findOne({ name: team2 })
    .then((res) => {
      console.log(res._id);
      team2id = res._id;
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: "Country does not exist" });
    });

  const searchGame = await Game.findOne({ name: name });
  if (searchGame) {
    // console.log(searchGame.opponents.players);
    const newOpponentSet = {
      team1: team1id,
      team2: team2id,
      date: date,
    };

    await Game.findOneAndUpdate(
      { name: name },
      {
        $push: {
          opponents: newOpponentSet,
        },
      }
    )
      .then((res) => {
        res.status(200).json({ message: "Event added to the list" });
      })
      .catch((err) => {
        res.json({ error: err });
      });
  } else {
    //create a new one here
    const game = new Game({
      name: name,
      opponents: { team1: team1id, team2: team2id, date: date },
    });

    console.log(game.opponents);

    const savedGame = await game.save();
    if (savedGame) res.status(200).json({ message: "Game saved" });
    else {
      res.json({ error: "Not Saved" });
    }
  }
});

router.get("/allEvents", async (req, res) => {
  await Game.find()
    .limit(20)
    .then((games) => res.status(200).json({ data: games }))
    .catch((err) => res.json({ error: err }));
});

router.post("/eventsByDay", async (req, res) => {
  const { date } = req.body;
  var opponents;
  var data = [];
  var eventsList = await Game.find({ "opponents.date": date });
  eventsList.forEach((event) => {
    opponents = event.opponents.filter((game) => game.date === date);
    event.opponents = opponents;
  });
  return res.status(200).json({ data: eventsList });
});

// router.post("eventsByCountry",async(req,res)=>
// {
//     const {name} = req.body;
//     await
// })

module.exports = router;
