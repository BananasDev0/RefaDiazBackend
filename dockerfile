# Use a lightweight Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json and package-lock.json files initially
COPY package.json package-lock.json ./

# Install production dependencies and clean up cache
RUN npm install --only=production && npm cache clean --force

# Install PM2 globally in a separate layer to leverage Docker caching
RUN npm install -g pm2

# Copy the rest of the application code to the container
COPY . .

# Expose the port the API runs on (assuming 3000 only)
EXPOSE 3000

# Use a non-root user for better security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Use PM2 to run the application with the ecosystem configuration
CMD ["pm2-runtime", "start", "ecosystem.config.cjs", "--env", "production"]