const server = require('./server');
const { Config } = require('./configs/config');

// starting the server
const port = Config.isDev ? Number(Config.PORT) : Config.PORT;
const app = server.setup();
app.listen(port, () => console.log(`
  ==================================
  🚀 Server running on port ${port}!🚀
  ==================================
`));

module.exports = app;