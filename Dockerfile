FROM node:20-alpine

WORKDIR /app

COPY ./ /app/

EXPOSE 3000

CMD ["npm", "start"]
