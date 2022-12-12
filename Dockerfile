# Stage 1 testing
FROM node:18.0.0-alpine

RUN mkdir -p /data

COPY blacklist.txt  /data/
COPY package.json   /data/
COPY edgedb.toml    /data/
COPY .env           /data/
COPY .env.json      /data/
COPY prisma/        /data/prisma
COPY setup.sh       /data/
COPY tsconfig.json  /data/
COPY src            /data/src

RUN cd /data && yarn install
RUN cd /data && yarn prisma db push 
RUN cd /data && yarn build --verbose

RUN  npm install pm2 -g

WORKDIR /data
CMD ["pm2-runtime", "ecosystem.config.json"]
