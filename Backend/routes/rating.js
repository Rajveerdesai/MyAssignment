const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const { submitRating, ownerRatings } = require('../controllers/ratingController');

router.post('/', auth, role(['user']), submitRating);
router.get('/owner', auth, role(['owner']), ownerRatings);

module.exports = router;
