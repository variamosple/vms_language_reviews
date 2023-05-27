# Use an official Node runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container's working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container's working directory
COPY . .

# Build the application
RUN npm run build

# Expose port 3000 for the application to listen on
EXPOSE 3000

# Start the application when the container starts
CMD ["npm", "start"]