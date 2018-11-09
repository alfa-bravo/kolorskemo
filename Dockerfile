# build stage
FROM node:9.11.1-alpine as build-stage
WORKDIR /app/clients
COPY clients/package*.json ./
RUN npm install
COPY clients .
RUN npm run build

# production stage
WORKDIR /app/server
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /app/clients/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
