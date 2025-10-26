# ------------------------
# Build Stage
# ------------------------
FROM node:22-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install all dependencies (including dev for TS build)
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build TypeScript code
RUN npm run build

# ------------------------
# Production Stage
# ------------------------
FROM node:22-alpine

WORKDIR /usr/src/app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy compiled TypeScript output from build stage
COPY --from=build /usr/src/app/dist ./dist

# Expose the app port
EXPOSE 5002

# Set environment
ENV NODE_ENV=production

# Start the app
CMD ["node", "dist/server.js"]
