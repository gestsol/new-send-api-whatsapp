const express = require('express');
const { getQRfromWs,sendMessage } = require('../controllers/whatsapp.controller');
/* const {getState} = require('../whatsapp/whatsapp') */


const router = express.Router();

router.route('/login').get(getQRfromWs);
router.route('/sendmessage').post(sendMessage);
/* router.route('/get-state').get(getState); */

module.exports = router;