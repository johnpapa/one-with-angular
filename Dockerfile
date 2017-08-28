#APP ========================================
FROM node:6.11.2-alpine as builder

LABEL authors="Shayne Boyer"

RUN apk update \
  && apk add --update alpine-sdk \
  && npm install -g @angular/cli \
  && ng set --global packageManager=npm \
  && apk del alpine-sdk \
  && rm -rf /tmp/* /var/cache/apk/* *.tar.gz ~/.npm \
  && npm cache clear \
  && sed -i -e "s/bin\/ash/bin\/sh/" /etc/passwd

WORKDIR /app
COPY package.json /app
RUN npm install

COPY . /app

RUN ng build --prod

#SERVER =======================================
FROM node:6-alpine as server
WORKDIR /app
COPY /src/server /app
RUN npm install

#FINAL ========================================
FROM node:6-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --from=server /app /usr/src/app
COPY --from=builder /app/dist /usr/src/app
ENV PORT 80

CMD [ "node", "index.js" ]
