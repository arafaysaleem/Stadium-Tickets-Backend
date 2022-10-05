/* Routes */
const healthCheckRouter = require('../routes/healthCheck.routes');

class RoutesLoader {
    static initRoutes(app, version) {
        app.use(`/api/${version}/health`, healthCheckRouter);
    }
}

module.exports = {RoutesLoader};