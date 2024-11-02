

    # Use an official Node.js 18 image
    FROM node:18
    
    # Set working directory to /app
    WORKDIR /app
    
    # Copy package*.json files
    COPY package*.json ./
    
    # Install dependencies
    RUN npm install
    
    # Copy application code
    COPY . .
    
    # Build TypeScript code
    RUN npm run build
    
    # Expose port 3000
    EXPOSE 3000
    
    # Run command to start the development server
    CMD ["npm", "run", "start"]