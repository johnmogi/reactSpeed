const dal = require("../data-access-layer/dal");
async function getAllCommentsAsync() {
  const sql = `SELECT * FROM comments`;
  const comments = await dal.executeAsync(sql);
  return comments;
}
async function getOneCommentAsync(id) {
  //   const sql = `SELECT * FROM comments`;
  const sql = `SELECT * FROM comments WHERE gameID =${id}`;
  const comment = await dal.executeAsync(sql);
  return comment;
}

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

module.exports = { getAllCommentsAsync, getOneCommentAsync, addCommentAsync };
