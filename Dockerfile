FROM node:14
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --only=production
COPY . .
RUN npm-script build
EXPOSE 8080
CMD [ "node", "dist/server.js" ]
