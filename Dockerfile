FROM node:14.21

WORKDIR /app

COPY index.js /app/index.js
COPY dal.js /app/dal.js
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm ci --production

CMD [ "node", "index.js" ]
