const express = require('express');
const { findUserByUsername } = require('../repositories/LoginRepo');

const router = express.Router();

router.get('/check-username/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const existingUser = await findUserByUsername(username);

    res.json({ usernameExists: !!existingUser });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
