FROM node
WORKDIR /imageConverter
COPY package.json .
RUN npm install
COPY . .
CMD [ "npm", "start" ]