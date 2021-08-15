const connection = require('../app/database')

class questionService {
  async createQuestion(id, content) {
    const statement = `INSERT INTO question (user_id, content) VALUES (?, ?)`
    const [result] = await connection.execute(statement, [id, content])
    return result
  }

  async getQuestionList(offset, size) {
    const statement = `
    SELECT 
    m.id id, m.content content, m.createAt createAt, m.updateAt updateAt,
    JSON_OBJECT('id', u.id, 'nickname', u.nickname, 'avatarUrl', u.avatar_url) author,
    (SELECT COUNT(*) FROM answer c WHERE c.question_id = m.id) answerCount,
    (SELECT IF(COUNT(a.id),JSON_ARRAYAGG(
            JSON_OBJECT('id', a.id, 'content', a.content, 'createTime', a.createAt,
                        'user', JSON_OBJECT('id', cu.id, 'nickname', cu.nickname, 'avatarUrl', cu.avatar_url))
          ),NULL) FROM answer a
                  LEFT JOIN users cu ON a.user_id = cu.id WHERE m.id = a.question_id) answer
    FROM question m
    LEFT JOIN users u ON m.user_id = u.id
    ORDER BY id DESC
    LIMIT ?, ?;
    `
    const result = await connection.execute(statement, [offset, size])
    return result
  }

  async setAnswer(questionId, content, id) {
    const statement = `INSERT INTO answer (question_id, content, user_id) VALUES (?, ?, ?)`
    const [result] = await connection.execute(statement, [questionId, content, id])
    return result
  }
}

module.exports = new questionService()