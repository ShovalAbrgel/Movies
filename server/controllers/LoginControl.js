const express = require('express');
const { findUserByUsernameAndPassword } = require('../repositories/LoginRepo');

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsernameAndPassword(username, password);

    if (!user) {
      throw new Error('User not found');
    }

    res.status(200).json({
      user: { username: user.username, isAdmin: user.isAdmin },
      message: 'Login successful',
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

module.exports = router;
