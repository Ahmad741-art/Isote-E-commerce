
How to integrate Sentry into Backend/server.js

1. Install:
   npm install @sentry/node

2. At the top of server.js:
   const { initSentry, Sentry } = require("./config/sentry");
   initSentry();

3. Add request/tracing handlers around routes if SENTRY_DSN is set:
   if (process.env.SENTRY_DSN) {
     app.use(Sentry.Handlers.requestHandler());
     app.use(Sentry.Handlers.tracingHandler());
   }

4. Add Sentry error handler after your error middleware:
   if (process.env.SENTRY_DSN) {
     app.use(Sentry.Handlers.errorHandler());
   }

5. In your errorHandler middleware:
   const { Sentry } = require("./config/sentry");
   Sentry.captureException(err);

