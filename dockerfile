# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies using npm
# Install dependencies using npm with fallback

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create production image
# FROM node:18-alpine

# WORKDIR /app

# # Copy package files
# COPY package*.json ./

# # Install only production dependencies using npm
# RUN npm ci --only=production

# # Copy built files from builder
# COPY --from=builder /app/dist ./dist

# # Expose the port
# EXPOSE 3000

# # Command to run the application
# CMD ["node", "dist/main.js"]