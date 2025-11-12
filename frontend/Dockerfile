# ---- 1. Build Stage ----
# Official Node.js image
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the React application
RUN npm run build

# ---- 2. Production Stage ----
# Use an official Nginx image (a lightweight web server)
FROM nginx:stable-alpine

# Copy the built React app (from the 'dist' folder)
# into the Nginx folder that serves public HTML
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (the default Nginx port)
EXPOSE 80

# The default Nginx command will start the server automatically