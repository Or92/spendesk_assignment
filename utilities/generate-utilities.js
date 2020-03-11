class GenerateUtilities {
    static generateDigitsInLength(length) {
        let str = '';
        for (let i = 0; i < length; i++) {
            str += Math.ceil((Math.random() * 10)).toString();
        }
        return str;
    }
}


module.exports = GenerateUtilities;
