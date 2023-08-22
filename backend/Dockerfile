# tell the Docker what base image we would like to use
# Docker images can be inherited from other images. We’ll use the official Node.js image that already has all the tools and packages that we need to run a Node.js application.
FROM node:18-alpine 
# The NODE_ENV environment variable specifies the environment in which an application is running (usually, development or production). 
ENV NODE_ENV=production
# Creating a working directory, where we will run the rest of our commands.
WORKDIR /app
# Copy files to directory. <src> = what files, <dest> where. COPY ["<src>", "<dest>"]
COPY ["package.json", "package-lock.json*", "./"]
# Installing the packages.
RUN npm install --production
# For now we have an image based on Node-18 and we have installed the dependencies. 
# We have to copy our source code, takes all from src and add to dest. 
COPY . .
# Tell Docker what command we want to run when our image is run inside of a container.
CMD ["node", "server.js"]
# Build the image. The tag is used to set the name of the image. docker build --tag node-docker .
