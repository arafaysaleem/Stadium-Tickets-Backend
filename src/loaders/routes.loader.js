/* Routes */
const healthCheckRouter = require('../routes/healthCheck.routes');
const authRouter = require('../routes/auth.routes');
const userRouter = require('../routes/user.routes');
const zoneTypeRouter = require('../routes/zoneType.routes');
const zoneRouter = require('../routes/zone.routes');
const eventRouter = require('../routes/event.routes');
const zoneResourceRouter = require('../routes/zoneResource.routes');
const zoneDisabledSeatRouter = require('../routes/zoneDisabledSeat.routes');
const parkingFloorRouter = require('../routes/parkingFloor.routes');
const parkingDisabledSpaceRouter = require('../routes/parkingDisabledSpace.routes');
const { apiKeyAuth } = require('../middleware/auth.middleware');

class RoutesLoader {
    static initRoutes(app, version) {
        const baseRoute = `/api/${version}`;

        // Check api key on all routes
        app.use(`${baseRoute}/*`, apiKeyAuth());
        
        app.use(`${baseRoute}/auth`, authRouter);
        app.use(baseRoute, healthCheckRouter);
        app.use(baseRoute, userRouter);
        app.use(baseRoute, zoneRouter);
        app.use(baseRoute, zoneResourceRouter);
        app.use(baseRoute, zoneDisabledSeatRouter);
        app.use(baseRoute, zoneTypeRouter);
        app.use(baseRoute, parkingFloorRouter);
        app.use(baseRoute, parkingDisabledSpaceRouter);
        app.use(baseRoute, eventRouter);
    }
}

module.exports = {RoutesLoader};