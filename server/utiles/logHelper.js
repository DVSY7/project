const db = require('../config/db');

const logLoginAttempt = async (userId, result, req) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];

  await db.query(`
    INSERT INTO login_logs (user_id, ip_address, user_agent, login_result)
    VALUES (?, ?, ?, ?)
  `, [userId, ip, userAgent, result]);
};

module.exports = { logLoginAttempt };
