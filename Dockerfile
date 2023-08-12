# Use an official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the rest of the application code to the container
COPY . .

# Install dependencies
RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 8080

# Specify the command to run your application
CMD [ "node", "./build/index.js" ]
