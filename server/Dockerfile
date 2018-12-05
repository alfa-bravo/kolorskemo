FROM node:11.2.0-slim
RUN apt-get update && apt-get install -y python3 python3-pip
WORKDIR /app/server
COPY ./package*.json ./
RUN npm install
COPY ./contrib ./contrib
RUN pip3 install ./contrib/ekstrakto
# TODO: use pipenv Pipfile instead of requirements.txt? 
COPY ./src/python_machine_learning/requirements.txt ./src/python_machine_learning/requirements.txt
RUN pip3 install -r ./src/python_machine_learning/requirements.txt
COPY ./src ./src
EXPOSE 8081
RUN ln -s /usr/bin/python3 /usr/bin/python
CMD ["npm", "start"]
