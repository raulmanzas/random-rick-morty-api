const express = require('express');
const episodesController = require('./controllers/episodesController');

const router = express.Router();
const defaultVersion = 'v1';

router.route(`/${defaultVersion}/episodes`).get(episodesController.get);

module.exports = router;
