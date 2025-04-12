const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  SALT_ROUNDS,
  JWT_SECRET,
} = require('../config/config');

const getHashedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS));
  return hashedPassword;
}

const comparePassword = async (password, hashedPassword) => {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  return isPasswordValid;
}

const getAccessToken = (userData) => {
  const accessToken = jwt.sign(
    { userData },
    JWT_SECRET,
    { expiresIn: '24h' },
  );
  return accessToken;
}

const verifyAccessToken = async (accessToken) => {
  try {
    const data = jwt.verify(accessToken, JWT_SECRET);
    return data;
  } catch (error) {
    return {
      error: error,
    };
  }
}

module.exports = {
  getHashedPassword,
  comparePassword,
  getAccessToken,
  verifyAccessToken,
};
