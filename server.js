const config = require('./config.js');
const app = require('./app.js');

/* static */
require('./static.js');

/* dynamic */
require('./middlewares/users.js');

app.server().listen(config.PORT, config.HOST);
