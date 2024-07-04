# Use Node image
FROM node:20.11.1

# Set the working directory
# This is where all ode files will be copied and run by Docker
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
# First dot is denotes the root dir of code
# Secxond dot denotes the dir where we need to copy the code in docker's dir, in this case /app mentioned above
COPY . .

# Expose the backend port
EXPOSE 8000

# Start the backend server
CMD ["npm", "start"]
