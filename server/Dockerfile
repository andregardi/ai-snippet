FROM node:20-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE ${PORT:-3001}

CMD ["node", "dist/src/index.js"]
