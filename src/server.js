const { ExpressLoader } = require('./loaders/express.loader');
const { DatabaseLoader } = require('./loaders/database.loader');
const { RoutesLoader } = require('./loaders/routes.loader');
const { MiddlewareLoader } = require('./loaders/middleware.loader');
const { Config } = require('../src/configs/config');

const setup = async() => {
    // load express and sentry
    const app = ExpressLoader.init();

    // init routes
    const version = Config.API_VERSION;
    RoutesLoader.initRoutes(app, version);

    // init middleware
    MiddlewareLoader.init(app);

    // load database
    await DatabaseLoader.init();
    
    return app;
};

module.exports = {setup};