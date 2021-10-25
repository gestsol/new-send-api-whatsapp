/* 3ero luego de configur los controladores y luego creas-asocias las rutas GET,POST,PUT segun sea el caso
 */
const express = require('express');
const { restartServer,shutdownServer } = require('../controllers/server-control.controller');

const router = express.Router();
router.route('/reset').get(restartServer);
router.route('/shutdown').get(shutdownServer);

module.exports = router;