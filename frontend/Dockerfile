# Use the latest stable Node.js LTS image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy application source
COPY . .

# Expose Vite development server port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]