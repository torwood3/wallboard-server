FROM node:boron

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json /app
RUN npm install

COPY . /app

EXPOSE 3000

CMD [ "npm", "start", "&" ]
