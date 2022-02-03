const express = require('express');
const episodesController = require('./controllers/episodesController');

const router = express.Router();

router.route('/episodes').get(episodesController.get);

module.exports = router;
