const connection = require('../app/database')

class ArticleService {
  async create(userId, title, content) {
    const statement = `INSERT INTO article (content, user_id, title) VALUES (?, ?, ?)`
    const result = await connection.execute(statement, [content, userId, title])
    return result[0]
  }

  async getMomentById(id) {
    const statement = `
      SELECT
        a.id id, a.content content, a.createAt createAt, a.updateAt updateAt,
        JSON_OBJECT('id', u.id, 'nickname', u.nickname, 'avatarUrl', u.avatar_url) author,
        JSON_ARRAYAGG(
          JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id,
          'createAt', c.createAt,
                    'user', JSON_OBJECT('id', cu.id, 'nickname', cu.nickname, 'avatarUrl', cu.avatar_url))
        ) comments
      FROM article a
      LEFT JOIN users u ON a.user_id = u.id
      LEFT JOIN comments c ON c.article_id = a.id
      LEFT JOIN users cu ON c.user_id = cu.id
      WHERE a.id = ?
    `
    const result = await connection.execute(statement, [id])
    return result
  }

  async getMomentList(offset, size) {
    const statement = `
      SELECT
        m.id id, m.content content, m.title title, m.praise praise, m.createAt createAt, m.updateAt updateAt,
        JSON_OBJECT('id', u.id, 'nickname', u.nickname, 'avatarUrl', u.avatar_url) author,
        (SELECT COUNT(*) FROM comments c WHERE c.article_id = m.id) commentCount,
        (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
          JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
                      'user', JSON_OBJECT('id', cu.id, 'nickname', cu.nickname, 'avatarUrl', cu.avatar_url))
        ),NULL) FROM comments c
                LEFT JOIN users cu ON c.user_id = cu.id WHERE m.id = c.article_id) comments
      FROM article m
      LEFT JOIN users u ON m.user_id = u.id
      ORDER BY id DESC
      LIMIT ?, ?
    `
    const result = await connection.execute(statement, [offset, size])
    return result
  }

  async getArticleByuserId(id) {
    const statement = `SELECT * FROM article WHERE user_id = ?;`
    const result = await connection.execute(statement, [id])
    return result[0]
  }

  async remove(articleId) {
    const statement = `DELETE FROM article WHERE id = ?`
    const [result] = await connection.execute(statement, [articleId])
    return result
  }
  async searchArt(find) {
    const statement = `
    SELECT
        m.id id, m.content content, m.title title, m.praise praise, m.createAt createAt, m.updateAt updateAt,
        JSON_OBJECT('id', u.id, 'nickname', u.nickname, 'avatarUrl', u.avatar_url) author,
        (SELECT COUNT(*) FROM comments c WHERE c.article_id = m.id) commentCount,
        (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
          JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
                      'user', JSON_OBJECT('id', cu.id, 'nickname', cu.nickname, 'avatarUrl', cu.avatar_url))
        ),NULL) FROM comments c
                LEFT JOIN users cu ON c.user_id = cu.id WHERE m.id = c.article_id) comments
      FROM article m
      LEFT JOIN users u ON m.user_id = u.id
      WHERE title LIKE ?
      ORDER BY id DESC
    `
    const [result] = await connection.execute(statement, [find])
    return result
  }
}

module.exports = new ArticleService()