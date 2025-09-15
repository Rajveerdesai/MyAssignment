const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const { dashboard, listUsers } = require('../controllers/adminController');
const { createStore } = require('../controllers/storeController');

router.use(auth);
router.use(role(['admin']));

router.get('/dashboard', dashboard);
router.get('/users', listUsers);
router.post('/stores', createStore);

module.exports = router;
