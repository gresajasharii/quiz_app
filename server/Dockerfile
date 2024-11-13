# Start with a base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your app runs on (e.g., 8080)
EXPOSE 8080

# Start the application
CMD ["npm", "start"]