const express = require('express');
const { findUserByUsername } = require('../repositories/LoginRepo');

const router = express.Router();

router.put('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await findUserByUsername(username);

    if (!existingUser) {
      return res.status(400).json({ message: 'Username not found' });
    }

    existingUser.password = password;
    await existingUser.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
