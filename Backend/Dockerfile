
# Backend Dockerfile for production
FROM node:18-alpine

WORKDIR /usr/src/app

COPY Backend/package*.json ./
RUN npm ci --only=production

COPY Backend/ ./

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:5000/health || exit 1

CMD ["node", "server.js"]

