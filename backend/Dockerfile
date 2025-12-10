FROM node:18

WORKDIR /app

# Copy package.json & install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose the same port as server.js
EXPOSE 4000

# Start the server
CMD ["node", "server.js"]
