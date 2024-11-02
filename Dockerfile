# Use the official Node.js 18 image
FROM node:20.8.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code
COPY . .

# Compile TypeScript code
#RUN  tsc

# Expose the application's port
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]


