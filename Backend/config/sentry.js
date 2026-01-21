
const Sentry = require("@sentry/node");

function initSentry() {
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || "development",
      tracesSampleRate: 0.1,
    });
    console.info("Sentry initialized");
  } else {
    console.info("SENTRY_DSN not set - Sentry disabled");
  }
}

module.exports = { initSentry, Sentry };

