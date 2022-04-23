const { default: mongoose } = require('mongoose');
const { URI_TEST } = require('../config/config.js');

describe('Start Database', () => {
    before(function (done) {
        mongoose.connect(URI_TEST, done)
    });

    require('./register.test.js');
    require('./login.test.js');
    require('./module.test');
    require('./uf.test');
    require('./task.test');
    require('./truancy.test');
    require('./rule.test');
});