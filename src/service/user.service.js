const connection = require('../app/database')

class UserService {
  async create(telephone, password) {
    const statement = `INSERT INTO users (telephone, password) VALUES (?, ?)`;
    const result = await connection.execute(statement, [telephone, password])
    return result
  }

  async getUserByTelephone(telephone) {
    const statement = `SELECT * FROM users WHERE telephone = ?`
    const result = await connection.execute(statement, [telephone])
    return result[0]
  }

  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?`
    const [result] = await connection.execute(statement, [avatarUrl, userId])
    return result
  }
  async setMessage(nickname, age, email, userId) {
    const statement = `UPDATE users SET nickname = ?,age = ?,email = ? WHERE id = ?`
    const result = await connection.execute(statement, [nickname, age, email, userId])
    return result
  }
}

module.exports = new UserService()