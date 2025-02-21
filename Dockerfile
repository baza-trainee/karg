FROM node:20-alpine

WORKDIR /app

COPY ./ /app/

USER nobody

EXPOSE 3000

CMD ["npm", "start"]
