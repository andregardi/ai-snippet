FROM node:20-alpine as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE ${PORT:-3000}

CMD ["npm", "run", "serve"]