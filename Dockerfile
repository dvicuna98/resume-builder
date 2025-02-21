FROM node:23.0-alpine AS dependency-base

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

COPY package-lock.json .

FROM dependency-base AS production-base

RUN npm ci

COPY . .

RUN npm run build \
&& npm prune --production

# ---- Production stage ----
FROM nginx:stable-alpine AS production

# Copy the built frontend from the previous stage
COPY --from=production-base /app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]