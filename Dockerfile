FROM node:18-slim

WORKDIR /app

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

COPY package*.json ./

RUN npm install

COPY . .

# Build the application
RUN npm run build

# Expose the port on which the application will run
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]
