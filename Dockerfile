FROM node:20-slim

WORKDIR /app

# 1. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 2. Copy the rest of your source code (including server.ts)
COPY . .

# 3. CRITICAL: Build the TypeScript code into JavaScript
RUN npm run build

# 4. Expose the port your app uses
EXPOSE 3000

# 5. Run the compiled file from the dist folder
CMD ["node", "dist/server.js"]