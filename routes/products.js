const express = require('express');
const router = express.Router();

// GET
router.get('/', (req, res) => {
    res.send('/products/testing')
})

module.exports = router;