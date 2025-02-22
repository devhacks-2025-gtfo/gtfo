# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy generator files first
COPY . .

# Run the generator script to create the application files
RUN node generator.mjs

# Install dependencies
RUN npm install

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "server.js"] 