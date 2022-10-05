const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const { Config } = require("../configs/config");

class SentryLoader {
    static init(app) {
        Sentry.init({
            dsn: Config.SENTRY_DSN,
            environment: Config.NODE_ENV,
            sampleRate: 0.5,
            tracesSampleRate: Config.NODE_ENV === "production" ? 0.6 : 1.0,
            integrations: [
                // enable HTTP calls tracing
                new Sentry.Integrations.Http({ tracing: true }),
                // enable Express.js middleware tracing
                new Tracing.Integrations.Express({ app })
            ]
        });
    }
}

module.exports = { SentryLoader };