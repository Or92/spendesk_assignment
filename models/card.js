const { uuid } = require('uuidv4');
const GenerateUtilities = require('../utilities/generate-utilities');

const CARD_STATUS = {
    'BLOCK': 'BLOCK',
    'ACTIVE': 'ACTIVE'
};

class Card {
    constructor(card_id = null, wallet_id = null, currency = null, balance = null, gid = null, exp = null, ccv = null, user_id = null, status = null) {
        this.card_id = card_id;
        this.wallet_id = wallet_id;
        this.currency = currency;
        this.balance = balance;
        this.gid = gid;
        this.exp = exp;
        this.ccv = ccv;
        this.user_id = user_id;
        this.status = status;

    }

    create(wallet_id, currency, user_id, ) {
        this.card_id = uuid();
        this.wallet_id = wallet_id;
        this.currency = currency;
        this.balance = 0;
        this.gid = uuid();
        this.exp = `${(new Date().getMonth() + 1).toString().length === 1 ? '0' + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1).toString()}/${Number(new Date().getFullYear() + 3).toString().substr(2, 2)}`;
        this.ccv = GenerateUtilities.generateDigitsInLength(3);
        this.user_id = user_id;
        this.status = CARD_STATUS.ACTIVE;
    }

}

module.exports = {
    Card,
    CARD_STATUS
};