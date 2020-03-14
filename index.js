/*
NOTE: 
    POST    /wallet/create      create a wallet
    POSET   /card/create        create a card
    GET     /card               get all cards
    GET     /wallet             get all wallets
    POST    /card/fund          fund the card with money
    POST    /card/status        change the card status block/unblock
    POST    /wallet/transfer    transfer money between different ewallets
*/
global.logger = console.log;
const express = require('express');
const bodyParser = require('body-parser')
//NOTE: a dummy auth middleware just for demonstration purposes
const auth_middleware = require('./middlewares/auth/auth');
const wallet_routes = require('./routes/wallet/index');
const card_routes = require('./routes/card/index');
const ERRORS = require('./errors/errors');
const app = express();
app.use(bodyParser.json());

app.use('/card', auth_middleware, card_routes);
app.use('/wallet', auth_middleware, wallet_routes);

app.use((err, req, res, next) => {
    return res.json(err || ERRORS.GENERAL_ERROR);
});

const port = process.env.PORT || 1337;
app.listen(port, () => console.log(`app listening on port ${port}!`));

//NOTE: instead of using db (demonstration purposes)
const DATA = {
    organization: [
        { '123': [2] },
    ],
    user: [{
        '2': {
            wallet: [{ id: 6, currency: 'EUR', balance: 0, }, { id: 5, currency: 'USD', balance: 100, }],
            card: []
        }
    }],
};

module.exports = DATA;

