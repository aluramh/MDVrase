var express = require('express');
var router = express.Router();

// =====================================
// HOME PAGE (with login links) ========
// =====================================
router.get('/', (req, res, next) => {
    res.sendFile(`${process.env.BUILD_DIR}/index.html`)
});

module.exports = router;
