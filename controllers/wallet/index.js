class WalletController {
    constructor() {

    }

    create(req, res) {
        res.status(200).send('hello');
    }
    transfer(req, res) { }
    retrieve(req, res) { }
}

module.exports = WalletController;