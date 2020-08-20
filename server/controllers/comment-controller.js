const express = require("express");
const commentsLogic = require("../business-logic-layer/comment-logic");
const router = express.Router();
// GET http://localhost:3000/api/comments
router.get("/", async (request, response) => {
  try {
    const comments = await commentsLogic.getAllCommentsAsync();
    response.json(comments);
  } catch (err) {
    response.status(500).send(err.message);
  }
});
// GET http://localhost:3000/api/comments/comment/:id
router.get("/comment/:id", async (request, response) => {
    const id = +request.params.id
    try {
      const comment = await commentsLogic.getOneCommentAsync(id);
      response.json(comment);
    } catch (err) {
      response.status(500).send(err.message);
    }
  });
  // POST http://localhost:3000/api/comments/
router.post("/", async (request, response) => {
  const info = request.body
  try {
    const comment = await commentsLogic.addCommentAsync(info);
    response.json(comment);
  } catch (err) {
    response.status(500).send(err.message);
  }
});
module.exports = router;