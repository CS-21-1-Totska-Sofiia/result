FROM node
WORKDIR /storeFront
COPY package.json .
RUN npm install
RUN npm run build
COPY . .
EXPOSE 5010
CMD [ "npm", "run", "preview" ]