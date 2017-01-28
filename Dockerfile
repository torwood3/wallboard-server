FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/wallboard-server
WORKDIR /usr/src/wallboard-server

# Install app dependencies
COPY package.json /usr/src/wallboard-server/
RUN npm install

COPY . /usr/src/wallboard-server

EXPOSE 8080

CMD [ "npm", "start" ]
