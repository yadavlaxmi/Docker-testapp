FROM node 

ENV MONGO_DB_USERNAME=laxmi \
    MONGO_DB_PASSWORD=1234 

RUN mkdir -p /docker-testapp

COPY . /docker-testapp

CMD ["node", "/docker-testapp/server.js"]