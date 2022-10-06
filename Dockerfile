FROM node:current-alpine3.16
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY --chown=app:node package*.json .
RUN ["npm", "install"]
COPY --chown=app:node . .
ENTRYPOINT ["npm", "run", "dev"]