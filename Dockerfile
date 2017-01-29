FROM hypriot/rpi-node:boron

# Create app directory
WORKDIR /app

# Install app dependencies
ADD package.json /app
RUN npm install

ADD . /app

EXPOSE 3000

CMD ["npm","start", "&"]
