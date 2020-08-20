const express = require("express");
const productsLogic = require("../business-logic-layer/item-logic");
const router = express.Router();
// GET http://localhost:3000/api/games
router.get("/", async (request, response) => {
  try {
    const rests = await productsLogic.getAllGamesAsync();
    response.json(rests);
  } catch (err) {
    response.status(500).send(err.message);
  }
});
// GET http://localhost:3000/api/games/game/:id
router.get("/game/:id", async (request, response) => {
    const id =+request.params.id
    try {
      const game = await productsLogic.getOneGameAsync(id);
      response.json(game);
    } catch (err) {
      response.status(500).send(err.message);
    }
  });
module.exports = router;