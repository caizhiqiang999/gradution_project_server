const connection = require('../app/database')

class AuthService {
  async checkResource(tableName, resourceId, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?`
    const [result] = await connection.execute(statement, [resourceId, userId])
    return result.length === 0 ? false : true
  }
}

module.exports = new AuthService()