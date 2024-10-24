FROM node:18-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

ENV NODE_ENV=production
RUN npm run build

RUN apk add --no-cache bash
COPY wait-for-it.sh /usr/local/bin/wait-for-it  
RUN chmod +x /usr/local/bin/wait-for-it 

ENV PORT=3000
EXPOSE 3000

CMD ["sh", "-c", "wait-for-it db:5432 -- npm run dbcreate || echo 'dbcreate failed, continuing...' && npm run dbmigrate && npm run start"]

