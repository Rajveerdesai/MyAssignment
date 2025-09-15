const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

router.use(auth);
router.use(role(['owner']));

router.get('/dashboard', (req,res)=> res.json({ message: 'Owner dashboard placeholder' }));

module.exports = router;
