const ERRORS = require('../../errors/errors');

class WalletService {
    userOwner(user_id, wallet_id) {
        const DATA = require('../../index');
        user_id_arr = DATA.user.map(user => Object.keys(user)[0]);
        const ind = user_id_arr.indexOf(user_id);
        return DATA.user[ind][user_id].wallet.filter(wallet => wallet.id.toString() === wallet_id).length > 0;
    }

    getWalletCurrency(user_id, wallet_id) {
        const DATA = require('../../index');
        user_id_arr = DATA.user.map(user => Object.keys(user)[0]);
        const ind = user_id_arr.indexOf(user_id);
        return DATA.user[ind][user_id].wallet.filter(wallet => wallet.id.toString() === wallet_id)[0].currency;
    }

    getBalance(user_id, wallet_id) {
        const DATA = require('../../index');
        user_id_arr = DATA.user.map(user => Object.keys(user)[0]);
        const ind = user_id_arr.indexOf(user_id);
        return DATA.user[ind][user_id].wallet.filter(wallet => wallet.id.toString() === wallet_id)[0].balance;
    }

    removeFunds(user_id, wallet_id, amount) {
        try {
            const DATA = require('../../index');
            user_id_arr = DATA.user.map(user => Object.keys(user)[0]);
            const ind = user_id_arr.indexOf(user_id);
            let wallet_index = -1;
            DATA.user[ind][user_id].wallet.forEach((wallet, ind) => wallet.id.toString() === wallet_id ? wallet_index = ind : null);
            if (wallet_index > -1) {
                DATA.user[ind][user_id].wallet[wallet_index].balance -= amount;
            }
            else {
                throw ERRORS.GENERAL_ERROR;
            }
        }
        catch (e) {
            throw e;
        }

    }

    addFunds(user_id, wallet_id, amount) {
        try {
            const DATA = require('../../index');
            user_id_arr = DATA.user.map(user => Object.keys(user)[0]);
            const ind = user_id_arr.indexOf(user_id);
            let wallet_index = -1;
            DATA.user[ind][user_id].wallet.forEach((wallet, ind) => wallet.id.toString() === wallet_id ? wallet_index = ind : null);
            if (wallet_index > -1) {
                DATA.user[ind][user_id].wallet[wallet_index].balance += amount;
            }
            else {
                throw ERRORS.GENERAL_ERROR;
            }
        }
        catch (e) {
            throw e;
        }

    }
}

module.exports = WalletService;