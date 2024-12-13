# Use Node.js official image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire server directory into the container
COPY . .

# Expose port (make sure it matches the port you're using in the backend)
EXPOSE 3001

# Start the server
CMD ["npm", "run", "dev"]
