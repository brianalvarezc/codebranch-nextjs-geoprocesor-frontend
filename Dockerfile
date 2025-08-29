# Multi-stage Dockerfile for a Next.js application
# Builder stage: installs dependencies and builds the app
FROM node:20-alpine AS builder

WORKDIR /app

# Install system dependencies if needed
RUN apk add --no-cache python3 make g++

# Copy package manifests and install dependencies
COPY package*.json ./
RUN npm ci --silent

# Copy source code and build
COPY . .
RUN npm run build --silent

# Remove build-only toolchain
RUN apk del python3 make g++ || true

# Production image: only production dependencies and built app
FROM node:20-alpine AS runner

WORKDIR /app

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package*.json ./
RUN npm ci --omit=dev --production --silent || npm ci --only=production --silent

# Copy built output and public assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/src ./src
COPY --from=builder /app/app ./app

ENV NODE_ENV=production
ARG PORT=4000
ENV PORT=${PORT}

USER appuser
EXPOSE ${PORT}

CMD ["npm", "start"]
