/* Routes */
const healthCheckRouter = require('../routes/healthCheck.routes');
const authRouter = require('../routes/auth.routes');
const userRouter = require('../routes/user.routes');

class RoutesLoader {
    static initRoutes(app, version) {
        app.use(`/api/${version}/health`, healthCheckRouter);
        app.use(`/api/${version}/auth`, authRouter);
        app.use(`/api/${version}/users`, userRouter);
    }
}

module.exports = {RoutesLoader};