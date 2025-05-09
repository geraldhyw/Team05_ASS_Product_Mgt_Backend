# Use official Node.js image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Ensure start.sh is executable (just in case)
RUN chmod +x /app/devops/production/start.sh

# Expose the port your app will run on
EXPOSE 3001

# Command to start your application
CMD ["node", "server.js"]