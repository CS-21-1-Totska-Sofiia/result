FROM node
WORKDIR /storeServer
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3010
CMD [ "npm", "start" ]