FROM node 

RUN mkdir -p /docker-testapp

COPY . /docker-testapp

CMD ["node", "/docker-testapp/server.js"]