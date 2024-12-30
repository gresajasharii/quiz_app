# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies for smaller image
RUN npm install --only=production

# Copy the rest of the files to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port 
EXPOSE 8080

# Use npm start to run the application
CMD ["npm", "start"]
