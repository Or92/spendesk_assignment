const Card = require('../../models/card').Card;
const WalletService = require('../wallet/wallet-service');
const ERRORS = require('../../errors/errors');

class CardService {

    create(wallet_id, currency, user_id) {
        const card = new Card();
        card.create(wallet_id, currency, user_id);
        const DATA = require('../../index');
        user_id_arr = DATA.user.map(user => Object.keys(user)[0]);
        const ind = user_id_arr.indexOf(user_id);
        DATA.user[ind][user_id].card.push(card);
        return card;
    }

    getCardStatus(card_id, user_id) {
        return this._helperFunc(card_id, user_id).status;
    }

    setCardStatus(card_id, user_id, status) {
        return this._helperFunc(card_id, user_id).status = status;
    }

    _helperFunc(card_id, user_id) {
        const DATA = require('../../index');
        user_id_arr = DATA.user.map(user => Object.keys(user)[0]);
        const ind = user_id_arr.indexOf(user_id);
        let card_index = -1;
        DATA.user[ind][user_id].card.forEach((card, ind) => card.card_id === card_id ? card_index = ind : null);
        if (card_index > -1) {
            return DATA.user[ind][user_id].card[card_index];
        }
        else {
            throw ERRORS.GENERAL_ERROR;
        }
    }

    addFunds(card_id, user_id, amount) {
        this._helperFunc(card_id, user_id).balance += amount;
    }

    getBelongingWalletIdFromCardId(card_id, user_id) {
        return this._helperFunc(card_id, user_id).wallet_id;
    }

    getFunds(card_id, user_id) {
        return this._helperFunc(card_id, user_id).balance;
    }

    getCards(user_id) {
        try {
            const DATA = require('../../index');
            user_id_arr = DATA.user.map(user => Object.keys(user)[0]);
            const ind = user_id_arr.indexOf(user_id);
            return DATA.user[ind][user_id].card;
        }
        catch (e) {
            throw e;
        }
    }

    removeFunds(card_id, user_id, amount) {
        return this._helperFunc(card_id, user_id).balance -= amount;
    }

}

module.exports = CardService;