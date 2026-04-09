FROM node:20

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build the project (if needed, since you have vite/typescript)
RUN npm run build

# Expose the port your server uses (check server.ts, but 8080 is common)
EXPOSE 8080

# Run the server
CMD ["node", "dist/server.js"]