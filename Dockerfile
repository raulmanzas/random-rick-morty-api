FROM node:17-alpine

ENV PORT 8080
ENV NODE_ENV development
ENV USER rick-morty-user

RUN apk update

RUN adduser -D ${USER} \
  && mkdir -p /etc/sudoers.d \
  && echo "${USER} ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/${USER} \
  && chmod 0440 /etc/sudoers.d/${USER}
WORKDIR /home/${USER}

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE ${PORT}/tcp

USER ${USER}

CMD [ "npm", "start" ]
