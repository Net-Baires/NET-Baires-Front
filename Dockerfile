FROM node:latest
RUN mkdir /src
RUN npm install nodemon -g
RUN npm install express
RUN npm install node-fetch
WORKDIR /src
RUN ["mkdir","dist"]
RUN ["ls"]
copy ./dist ./dist
copy ./dist/app.js .
EXPOSE 8080
CMD nodemon app.js