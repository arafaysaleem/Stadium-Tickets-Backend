/* Routes */
const healthCheckRouter = require('../routes/healthCheck.routes');
const authRouter = require('../routes/auth.routes');
const userRouter = require('../routes/user.routes');
const zoneTypeRouter = require('../routes/zoneType.routes');
const { apiKeyAuth } = require('../middleware/auth.middleware');

class RoutesLoader {
    static initRoutes(app, version) {
        // Check api key on all routes
        app.use(`/api/${version}/*`, apiKeyAuth());
        
        app.use(`/api/${version}/health`, healthCheckRouter);
        app.use(`/api/${version}/auth`, authRouter);
        app.use(`/api/${version}/users`, userRouter);
        app.use(`/api/${version}/zone-types`, zoneTypeRouter);
    }
}

module.exports = {RoutesLoader};