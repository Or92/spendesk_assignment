const express = require('express')
const router = express.Router();
const CardController = require('../../controllers/card/index');

const card_controller = new CardController();
//NOTE: card api

// curl -X POST -H "UserId: 2" -H "Content-Type: application/json" -H "CompanyId: 123" http://localhost:1337/card/create --data '{"wallet_id":"5", "currency":"USD"}' 
router.post('/create', card_controller.create.bind(card_controller));

// curl -X POST -H "UserId: 2" -H "Content-Type: application/json" -H "CompanyId: 123" http://localhost:1337/card/fund --data '{"wallet_id":"5", "card_id":"12e2ea2f-29a8-47c7-b71d-f5a891fdd6c9", "amount": 12}'
router.post('/fund', card_controller.fund.bind(card_controller));

// curl -X POST -H "UserId: 2" -H "Content-Type: application/json" -H "CompanyId: 123" http://localhost:1337/card/status --data '{"status":"BLOCK", "card_id":"12e2ea2f-29a8-47c7-b71d-f5a891fdd6c9"}'
router.post('/status', card_controller.changeStatus.bind(card_controller));

// curl -X GET -H "UserId: 2" -H "Content-Type: application/json" -H "CompanyId: 123" http://localhost:1337/card
router.get('/', card_controller.retrieve.bind(card_controller));

module.exports = router;