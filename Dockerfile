FROM node:14
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 8080
CMD [ "node", "dist/server.js" ]
