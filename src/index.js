const server = require('./server');
const { Config } = require('./configs/config');

// starting the server
const port = Config.isDev ? Number(Config.PORT) : Config.PORT;
const app = server.setup().then(_app => {
    _app.listen(port, () => console.log(
        `\n==================================\n` +
        `🚀 Server running on port ${port}!🚀` +
        `\n==================================`
    ));

    return _app;
});

module.exports = app;