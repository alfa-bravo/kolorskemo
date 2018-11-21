FROM node:9.11.1-alpine
WORKDIR /app/server
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 8081
CMD ["npm", "start"]
