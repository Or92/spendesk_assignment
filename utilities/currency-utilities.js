class CurrencyUtilities {
    constructor() {
        this.available_currencies = {
            'USD': 0,
            'EUR': 1,
            'GBP': 2
        };
    }

    validateCurrency(currency) {
        return Object.keys(this.available_currencies).indexOf(currency.toUpperCase()) > -1;
    }
}


module.exports = CurrencyUtilities;