module.exports.Config = {
    API_VERSION: 'v1',
    NODE_ENV: process.env.NODE_ENV || 'dev',
    PORT: process.env.PORT || 3331,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'admin',
    DB_PASS: process.env.DB_PASS || '',
    DB_DATABASE: process.env.DB_DATABASE || 'test',
    DB_CONN_LIMIT: process.env.DB_CONN_LIMIT || 10,
    SECRET_JWT: process.env.SECRET_JWT || "SECRET_JWT",
    EXPIRY_JWT: '1h',
    EXPIRY_HOURS_OTP: 1,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || "SENDGRID_API_KEY",
    SENDGRID_SENDER: process.env.SENDGRID_SENDER || "SENDGRID_FROM_EMAIL",
    SENTRY_DSN: process.env.SENTRY_DSN || "https://some-id@oid.ingest.sentry.io/id"
};