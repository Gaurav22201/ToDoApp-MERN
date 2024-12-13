# Use Node.js official image to build the app
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire React app
COPY . .

# Build the React app for production
RUN npm ci

# Expose the port the app will run on
EXPOSE 5173

# Start the React app using serve
CMD ["npm", "run", "dev"]
