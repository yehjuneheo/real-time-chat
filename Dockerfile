# Step 1: Use Node.js base image
FROM node:14

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Step 4: Copy the application code
COPY . .

# Step 5: Expose port 5000
EXPOSE 3000

# Step 6: Start the application
CMD ["npm", "start"]
