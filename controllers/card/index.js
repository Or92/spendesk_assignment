const CardService = require('../../services/card/card-service');
const CurrencyUtilities = require('../../utilities/currency-utilities');
const WalletService = require('../../services/wallet/wallet-service');
const ERRORS = require('../../errors/errors');
const CARD_STATUS = require('../../models/card').CARD_STATUS;

class CardController {
    constructor() {
        this.class_name = 'CardController';
        this.cardService = new CardService();
        this.walletService = new WalletService();
    }

    create(req, res) {
        const method_name = `${this.class_name}/create`;
        try {
            logger(`${method_name} - start`);
            const wallet_id = req.body && req.body.wallet_id || '';
            const currency = req.body && req.body.currency || '';

            if (!(wallet_id && currency)) {
                throw ERRORS.MISSING_PARAMS;
            }

            const currencyUtilities = new CurrencyUtilities();
            if (!(wallet_id && currencyUtilities.validateCurrency(currency))) {
                throw ERRORS.UNSUPPORTED_CURRENCY;
            }
            const { userid } = req.headers;
            if (this.walletService.userOwner(userid, wallet_id)) {
                if (this.walletService.getWalletCurrency(userid, wallet_id) === currency.toUpperCase()) {
                    const data = this.cardService.create(wallet_id, currency, userid);
                    logger(`${method_name} - end`);
                    return res.json({ success: true, data });
                }
                throw ERRORS.MISSMATCH_CURRENCIES;
            }
            throw ERRORS.INVALID_USERID_OR_WALLETID;
        }
        catch (e) {
            logger(`${method_name} - error: `, e);
            return res.json(e || ERRORS.GENERAL_ERROR);
        }
    }

    fund(req, res) {
        const method_name = `${this.class_name}/fund`;
        try {
            logger(`${method_name} - start`);
            const wallet_id = req.body && req.body.wallet_id || '';
            const card_id = req.body && req.body.card_id || '';
            const amount = req.body && req.body.amount || '';

            if (!(wallet_id && card_id && amount)) {
                throw ERRORS.MISSING_PARAMS;
            }
            const { userid } = req.headers;
            if (this.walletService.userOwner(userid, wallet_id)) {
                if (this.walletService.getBalance(userid, wallet_id) >= amount) {
                    //NOTE: from DB prospective, this should be in a transaction pattern 
                    this.walletService.removeFunds(userid, wallet_id, amount);
                    this.cardService.addFunds(card_id, userid, amount);
                    logger(`${method_name} - end`);
                    return res.json({ success: true });
                }
                throw ERRORS.INSUFFICIENT_FUNDS;
            }
            throw ERRORS.INVALID_USERID_OR_WALLETID;
        }
        catch (e) {
            logger(`${method_name} - error: `, e);
            return res.json(e || ERRORS.GENERAL_ERROR);
        }
    }

    //NOTE: here i didnt do any policy validation regarding the user taking the action
    changeStatus(req, res) {
        const method_name = `${this.class_name}/changeStatus`;
        try {
            logger(`${method_name} - start`);
            const card_id = req.body && req.body.card_id || '';
            const status = req.body && req.body.status || '';

            if (!(card_id && status)) {
                throw ERRORS.MISSING_PARAMS;
            }

            const { userid } = req.headers;

            const current_card_status = this.cardService.getCardStatus(card_id, userid);

            if ((current_card_status === CARD_STATUS.BLOCKED && status === CARD_STATUS.BLOCKED) || (current_card_status === CARD_STATUS.ACTIVE && status === CARD_STATUS.ACTIVE)) {
                throw ERRORS.INVALID_OPERATION;
            }

            switch (status.toUpperCase()) {
                case CARD_STATUS.ACTIVE:
                    this.cardService.setCardStatus(card_id, userid, status);
                    break;
                case CARD_STATUS.BLOCK:
                    this.cardService.setCardStatus(card_id, userid, status);
                    const amount = this.cardService.getFunds(card_id, userid);
                    this.cardService.removeFunds(card_id, userid, amount);
                    const wallet_id = this.cardService.getBelongingWalletIdFromCardId(card_id, userid);
                    this.walletService.addFunds(userid, wallet_id, amount);
                    break;
                default:
                    throw ERRORS.UNSUPPORTED_STATUS;
            }
            logger(`${method_name} - end`);
            return res.json({ success: true });
        }
        catch (e) {
            logger(`${method_name} - error: `, e);
            return res.json(e || ERRORS.GENERAL_ERROR);
        }
    }

    retrieve(req, res) {
        const method_name = `${this.class_name}/retrieve`;
        try {
            logger(`${method_name} - start`);
            const { userid } = req.headers;
            const data = this.cardService.getCards(userid);
            logger(`${method_name} - end`);
            return res.json({ success: true, data });
        }
        catch (e) {
            logger(`${method_name} - error: `, e);
            return res.json(e || ERRORS.GENERAL_ERROR);
        }
    }
}

module.exports = CardController;