const express = require('express')
const router = express.Router();
const CardController = require('../../controllers/card/index');

const card_controller = new CardController();
//NOTE: card api

// curl -X POST -H "UserId: 2" -H "Content-Type: application/json" -H "CompanyId: 123" http://localhost:1337/card/create --data '{"wallet_id":"5", "currency":"USD"}' 
router.post('/create', card_controller.create.bind(card_controller));

// curl -X POST -H "UserId: 2" -H "Content-Type: application/json" -H "CompanyId: 123" http://localhost:1337/card/fund --data '{"wallet_id":"5", "card_id":"47d2b941-a7ea-40ad-89ad-ee409fd42545", "amount": 12}'
router.post('/fund', card_controller.fund.bind(card_controller));

// curl -X POST -H "UserId: 2" -H "Content-Type: application/json" -H "CompanyId: 123" http://localhost:1337/card/status --data '{"status":"BLOCK", "card_id":"47d2b941-a7ea-40ad-89ad-ee409fd42545"}'
router.post('/status', card_controller.changeStatus.bind(card_controller));

// curl -X GET -H "UserId: 2" -H "Content-Type: application/json" -H "CompanyId: 123" http://localhost:1337/card
router.get('/', card_controller.retrieve.bind(card_controller));

module.exports = router;