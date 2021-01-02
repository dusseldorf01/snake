FROM node:14
#RUN npm install -g yarn
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --only=production
COPY . .
RUN npm build
EXPOSE 3000
CMD [ "node", "server.js" ]
