# ---- 1. Build Stage ----
#  Official Node.js image as the base
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm ci

# Copy all application source code
COPY . .

# Build the NestJS application
RUN npm run build

# ---- 2. Production Stage ----
# Use a smaller, secure Node.js image for the final container
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Only copy production dependencies from the 'builder' stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
# Copy the built application from the 'builder' stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# The command to start the application
CMD ["node", "dist/main"]