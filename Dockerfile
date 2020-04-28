FROM node:10.16.3
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 1122
CMD node node-http.js
