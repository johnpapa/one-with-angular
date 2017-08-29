LABEL authors="Shayne Boyer, John Papa"

#Angular App ========================================
FROM node:6.11.2-alpine as angular-app

#Linux setup
RUN apk update \
  && apk add --update alpine-sdk \
  && apk del alpine-sdk \
  && rm -rf /tmp/* /var/cache/apk/* *.tar.gz ~/.npm \
  && npm cache clear \
  && sed -i -e "s/bin\/ash/bin\/sh/" /etc/passwd

# Copy and install the Angular app
RUN npm install -g @angular/cli
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN ng build --prod

#Express server =======================================
FROM node:6-alpine as express-server
WORKDIR /app
COPY /src/server /app
RUN npm install

#Final image ========================================
FROM node:6-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --from=express-server /app /usr/src/app
COPY --from=angular-app /app/dist /usr/src/app
ENV PORT 80

CMD [ "node", "index.js" ]
