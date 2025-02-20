FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate  # Genera Prisma Client antes de ejecutar la app
CMD ["node", "server.js"]
