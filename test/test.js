const { default: mongoose } = require('mongoose');
const { URI_TEST } = require('../config/config.js');

describe('API', async () => {
    before(function (done) {
        mongoose.connect(URI_TEST, done);
    });

    require('./register.test.js');
    require('./login.test.js');
    require('./module.test.js');
    require('./uf.test.js');
    require('./task.test.js');
    require('./truancy.test.js');
    require('./rule.test.js');
});