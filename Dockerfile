FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN ["/bin/mkdir", "/root/.ssh", "-p"]

COPY id_rsa /root/.ssh/

RUN ["/bin/chmod", "0600", "/root/.ssh/id_rsa"]

COPY dockernodeinit.sh /

RUN /dockernodeinit.sh

EXPOSE 8443
EXPOSE 8080

CMD ["npm", "start"]