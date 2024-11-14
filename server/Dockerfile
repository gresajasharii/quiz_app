# Use the official Node.js image as the base
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy the local node_modules folder into the Docker image
COPY node_modules ./node_modules

# Copy the rest of the application files
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "start"]