FROM node:18-alpine

WORKDIR /app

# Install dependencies termasuk TypeScript dan type definitions
COPY package*.json ./

RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js
RUN npm run build

# Remove dev dependencies untuk production
RUN npm prune --production

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
