

const auth = (req, res, next) => {
    const { userid, companyid } = req.headers;
    if (userid && companyid) {
        const DATA = require('../../index');
        org_id_arr = DATA.organization.map(org => Object.keys(org)[0]);
        if (org_id_arr.indexOf(companyid.toString()) > -1) {
            //TODO: iterate over the userid of the org return next();
            user_id_arr = DATA.user.map(user => Object.keys(user)[0]);
            const ind = user_id_arr.indexOf(userid);
            if (ind > -1) {
                return next();
            }
        }
    }
    return res.status(401).send('UNAUTHORIZED');
}


module.exports = auth;