FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Ganti dari 'npm ci --only=production' ke 'npm install'
RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
