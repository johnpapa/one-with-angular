# First, run ng build --prod

FROM node:6-alpine
# FROM mhart/alpine-node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY dist/ /usr/src/app
#COPY src/server/ /usr/src/app/

# Install app dependencies
# COPY package.json /usr/src/app/
RUN npm install

ENV PORT 80
# EXPOSE 3000

CMD [ "node", "index.js" ]
