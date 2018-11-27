FROM node:11.2.0-slim
RUN apt-get update && apt-get install -y python3 python3-pip
WORKDIR /app/server
COPY ./package*.json ./
RUN npm install
COPY . .
RUN pip3 install ./contrib/ekstrakto
# TODO: use pipenv Pipfile instead of requirements.txt?
RUN pip3 install -r ./src/python_machine_learning/requirements.txt
EXPOSE 8081
CMD ["npm", "start"]
