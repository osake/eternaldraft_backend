FROM node:7-slim

COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 5000

CMD ["node", "./bin/www"]  
