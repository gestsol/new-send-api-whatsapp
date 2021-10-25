const express = require('express');
const { getQRfromWs,sendMessage,logoutFromWS } = require('../controllers/whatsapp.controller');

const router = express.Router();

router.route('/login').get(getQRfromWs);
router.route('/sendmessage').post(sendMessage);
router.route('/logout').post(logoutFromWS);


module.exports = router;