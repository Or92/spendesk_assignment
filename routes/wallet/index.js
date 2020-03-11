const express = require('express')
const router = express.Router();
const WalletController = require('../../controllers/wallet/index');

const wallet_controller = new WalletController();
//NOTE: wallet api

router.post('/create', wallet_controller.create);
router.post('/transfer', wallet_controller.transfer);
router.get('/', wallet_controller.retrieve);

module.exports = router;