const express = require("express");
const cors = require("cors");
const itemController = require("./controllers/item-controller");
const commentController = require("./controllers/comment-controller");
const server = express();
const PORT = 3001
const API = `http://localhost:${PORT}`
server.use(cors());
server.use(express.json());
server.use("/api/games", itemController);
server.use("/api/comments", commentController);
server.listen(PORT, () => console.log(`Listening on ${API}`));
