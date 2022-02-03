FROM node:17-alpine

RUN apk update

# RUN adduser -D rick-morty-user \
#   && mkdir -p /etc/sudoers.d \
#   && echo "rick-morty-user ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/rick-morty-user \
#   && chmod 0440 /etc/sudoers.d/rick-morty-user
# WORKDIR /home/rick-morty-user
# USER rick-morty-user

WORKDIR /api

COPY package*.json .
RUN ls
RUN npm install

COPY . .

ENV PORT 8080
ENV NODE_ENV development

EXPOSE 8080/tcp
CMD [ "npm", "start" ]
