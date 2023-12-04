# Use an official runtime as a parent image
FROM node:14 as build-stage

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Use a lighter-weight image for the production build
FROM nginx:alpine

# Copy the build files to the nginx web root directory
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

# Expose the port the app will run on
EXPOSE 3000

# Command to run the nginx server
CMD ["nginx", "-g", "daemon off;"]
