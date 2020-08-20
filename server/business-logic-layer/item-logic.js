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
    async function getOneGameAsync(id) {
          const sql = `${id}`;
          const game = await dal.executeAsync(sql);
          return game;
        }

module.exports = { getAllGamesAsync, getOneGameAsync };