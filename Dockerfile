# Production build for Next.js app
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port 3000 (Next.js default)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
