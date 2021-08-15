const connection = require('../app/database')

class CommentService {
  async create(articleId, content, userId) {
    const statement = `INSERT INTO comments (content, article_id, user_id) VALUES (?, ?, ?)`
    const [result] = await connection.execute(statement, [content, articleId, userId])
    return result
  }

  async reply(articleId, content, userId, commentsId) {
    const statement = `INSERT INTO comments (content, article_id, user_id, comment_id) VALUES (?, ?, ?, ?)`
    const [result] = await connection.execute(statement, [content, articleId, userId, commentsId])
    return result
  }

  async update(commentsId, content) {
    const statement = `UPDATE comments SET content = ? WHERE  id = ?`
    const [result] = await connection.execute(statement, [content, commentsId])
    return result
  }

  async remove(commentsId) {
    const statement = `DELETE FROM comments WHERE id = ?`
    const [result] = await connection.execute(statement, [commentsId])
    return result
  }

  async list(articleId) {
    const statement = `SELECT * FROM comments WHERE article_id = ?`
    const [result] = await connection.execute(statement, [articleId])
    return result
  }
}

module.exports = new CommentService()