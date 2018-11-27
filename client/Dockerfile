FROM node:9.11.1-alpine as build-stage
RUN apt-get update && apt-get install -y git # Needed for some npm dependencies
WORKDIR /app/client
COPY ./package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV production
RUN npm run build
CMD ["cp", "-a", "dist/.", "build-out/"]
