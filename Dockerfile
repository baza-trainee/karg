FROM node:20 AS build

WORKDIR /app

COPY ./ /app/

RUN npm install
RUN npm run build


FROM node:20-alpine AS runtime

WORKDIR /app

COPY --from=build /app /app

EXPOSE 8080

CMD ["npm", "start"]
