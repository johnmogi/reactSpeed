A cheat sheet to rule them all.
inner join 2 tables.
date format
client side validation
refreshed states
item cards

0. [{{ENV - workstation}}]:
   make sure computers is restarted
   make sure xampp is on
   connect camera
   prepare soothing music, water, small stuff to crunch, coffee in thermus.
   have the laptop nearby as well
   remember - your'e under surveillence - no phone calls -
   make phone unavailable with auto message.
   MAKE SURE PRETTIER WORKS

1. [{{test prep}}]:
   go over and read the test, create a readme file-
   seperete the requests into bullets - see if you understand everything.
   recreate the DB structure - db name, tables, fk pk...

[{{ServerMaster}}]

0. whilst building the server tab new to create-react to process- time save:
newTAB> npx create-react-app client --template typescript

1. server structure cli:
   mkdir server
   cd server
   touch app.js
   npm init -y
   mkdir data-access-layer
   cd data-access-layer
   touch dal.js
   cd ..
   mkdir business-logic-layer
   cd business-logic-layer
   touch item-logic.js
   cd ..
   mkdir controllers
   cd controllers
   touch item-controller.js
   cd ..
   cd data-access-layer
   touch dal.js

2. npm i express mysql cors joi

3. dal.js:
   const mysql = require("mysql"); const connection = mysql.createConnection({ host: "localhost", user: "root", password: "q1w2e3", database: "restotasks" }); connection.connect(err => { if (err) {
   console.error(err);
   return;
   } console.log("We're connected to restotasks on MySQL."); }); function executeAsync(sql) { return new Promise((resolve, reject) => {
   connection.query(sql, (err, result) => {
   if (err) {
   reject(err);
   return;
   }
   resolve(result);
   });
   }); } module.exports = { executeAsync };

4. item-controller.js:
const express = require("express");
const productsLogic = require("../business-logic-layer/item-logic");
const router = express.Router();
// GET http://localhost:3000/api/games
router.get("/", async (request, response) => {
  try {
    const rests = await productsLogic.getAllRestsAsync();
    response.json(rests);
  } catch (err) {
    response.status(500).send(err.message);
  }
});
module.exports = router;

5. item-logic.js: 
[in the first query, if time is needed, go to phpmyadmin, create a new select and copy the values into pasta, attach time format - DATE_FORMAT(gameDate, "%m/%d/%Y %H:%i") as-]
const dal = require("../data-access-layer/dal");
async function getAllGamesAsync() {
//   const sql = `SELECT * FROM games`;
  const sql = `SELECT gameID, teamA, teamB, teamAScore, teamBScore, DATE_FORMAT(gameDate, "%m/%d/%Y %H:%i") as gameDate, category FROM games`;
  const games = await dal.executeAsync(sql);
  return games;
}
async function getOneGameAsync(id) {
    //   const sql = `SELECT * FROM games`;
      const sql = `SELECT gameID, teamA, teamB, teamAScore, teamBScore, DATE_FORMAT(gameDate, "%m/%d/%Y %H:%i") as gameDate, category FROM games WHERE gameID =${id}`;
      const game = await dal.executeAsync(sql);
      return game;
    }
module.exports = { getAllGamesAsync, getOneGameAsync };

6. app.js:
const express = require("express");
const cors = require("cors");
const itemController = require("./controllers/item-controller");
const server = express();
const PORT = 3001
const API = `http://localhost:${PORT}`
server.use(cors());
server.use(express.json());
server.use("/api/games", itemController);
server.listen(PORT, () => console.log(`Listening on ${API}`));

01. BONUS POST:
----ctrl----
async function addCommentAsync(info) {
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth();
  const day = time.getDate() + 1;
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const timeNow = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  info.commentTime = timeNow;
  const sql = `INSERT INTO comments (comment, gameID, commentTime, tags) VALUES 
        ('${info.comment}', ${info.gameID}, '${info.commentTime}', '${info.tags}')`;
  const comment = await dal.executeAsync(sql);
  return comment;
}
----logic----
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

02. they don't know how to inner JOIN:
SELECT T.bookName,  U.reviewid, U.userName, U.review, U.reviewDate, U.bookID
  FROM userRating as U  JOIN titles as T
  [if asecondary primary id on the 2nd table - it won't accept null- allways send an added value?] 
  join tables simplified: SELECT * FROM `reviews` JOIN restaurants ON `restId`= id join tables extended: SELECT S.id, S.employeeID, S.date, S.salary, E.firstName, E.lastName
  FROM Salaries as S JOIN Employees as E
  ON E.id = S.employeeID
  `restCode``restId``date``visitor``review`
  select r.restCode, r.restId, r.date, r.visitor, r.review, s.restname
  from reviews as r join restaurants as s
  on r.id = s.id

00. tips for duplicating items:
make sure all paths are correct.
make sure all querys are reset.
console.log
go from top to bottom- especially connections, table names, query params etc.

[{{ClientMaster}}]

0. npx create-react-app client --template typescript

0. bootstrap (Y/N?):
npm install react-bootstrap bootstrap
index.tsx - import 'bootstrap/dist/css/bootstrap.min.css';

0. client folder cli spa single component: <skip next>

0. client folder cli spa multi component:
 npm i react-router-dom @types/react-router-dom
cd client
cd src
mkdir components
cd components
touch layout.tsx
touch header.tsx
touch footer.tsx
cd..
mkdir models
cd models
touch Game-model.tsx
touch Comment-model.tsx


1. determine if layer app or SPA single page app/layout single file

2. layout - simple:
import React, { Component } from "react"; export class Layout extends Component { render() { return ( <> hi </> ) } }

3. if '--isolatedModules


0. [{{FINAL}}]: 5 minutes before submission
   export db (create db table check) and clean out node modules from FS.
   place project into 3 folders - client, server, db
   make sure dal is cleaned
   upload zip file to mega.
