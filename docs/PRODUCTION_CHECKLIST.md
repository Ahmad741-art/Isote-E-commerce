
# Production Checklist — Isoté E‑commerce (extended)

Immediate generated assets:
- CI workflow, Dependabot config
- Backend Dockerfile, docker-compose
- scripts/mongo-backup.sh
- Backend tests, jest config
- Backend Sentry helper
- Extended Frontend scaffold (Vite + React)
- Frontend Dockerfile

Manual steps:
1. In Backend:
   - npm install --save-dev jest supertest cross-env nodemon
   - Ensure server.js exports app and uses guarded listen:
     if (require.main === module) { app.listen(PORT) }
     module.exports = app
2. In Frontend:
   - cd Frontend && npm install
   - Create Frontend/.env with:
       VITE_API_BASE_URL=http://localhost:5000
       VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   - npm run dev
3. Add production secrets to hosting / GitHub Secrets (SENTRY_DSN, STRIPE keys, DB credentials)
4. Run tests: cd Backend && npm test
5. Start locally with docker-compose up --build

Recommended next:
- Harden security, enable Dependabot PRs, add E2E tests, production backups to S3, and finalize legal pages.

