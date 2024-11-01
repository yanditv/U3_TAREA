# Use the Node.js 22 image as the base
FROM node:22

# Set the working directory inside the container
WORKDIR /home/app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the application port
EXPOSE 3000

# Command to start the server
CMD ["npm", "start"]
