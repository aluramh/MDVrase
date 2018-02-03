const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(`${process.env.BUILD_DIR}/index.html`)
});

module.exports = router;
