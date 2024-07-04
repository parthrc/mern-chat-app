# Set base image
FROM node:20-alpine

# create a new user with permissions to run the app
# -S -> create a system user
# -G -> add the user to a group
# This is done to avoid running the app as root
# If app is run as root, any vulnerability in the app can lrad root access to the system
# Its good practice to run app as non-root user
RUN addgroup app && adduser -S -G app app
# Set user to run app
USER app

# Set the working directory
# This is where all code files will be copied and run by Docker in its image
WORKDIR /app

# Copy package.json and package-lock.json
# This done before copying the rest of code files to take advantage of the docker caching
# if both these files have not changed, Docker will use the cached version
COPY package*.json ./

# Sometimes the ownership of the /app dir can change to root
# so the app cannot access them
# to avoid this we need to change ownsership to our created user
# first become root, and then change ownership to the user
USER root
# change ownership of the /app dir to app user
# chown -R <user>:<group> <directory>
# chowm cmd changes the user and/or group onwsership for givern file
RUN chown -R app:app .
# change user back to app user from root
USER app


# Install dependencies
RUN npm install

# Copy the rest of the application code
# First dot is denotes the root dir of code
# Secxond dot denotes the root dir where we need to copy the code, in this case /app mentioned above
COPY . .

# Expose the backend port
EXPOSE 5173

# Start the backend server
CMD ["npm", "run", "dev"]
