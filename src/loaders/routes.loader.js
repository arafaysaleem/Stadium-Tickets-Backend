/* Routes */
const healthCheckRouter = require('../routes/healthCheck.routes');
const authRouter = require('../routes/auth.routes');
const userRouter = require('../routes/user.routes');
const { ApiKeyAuth } = require('../middleware/auth.middleware');

class RoutesLoader {
    static initRoutes(app, version) {
        // Check api key on all routes
        app.use(`/api/${version}/*`, ApiKeyAuth());
        
        app.use(`/api/${version}/health`, healthCheckRouter);
        app.use(`/api/${version}/auth`, authRouter);
        app.use(`/api/${version}/users`, userRouter);
    }
}

module.exports = {RoutesLoader};