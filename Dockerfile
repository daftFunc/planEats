FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Create app directory
COPY server /usr/src/app/server
COPY client/build /usr/src/app/client/build
EXPOSE 3001
CMD [ "npm", "start" ]


# Work in progress