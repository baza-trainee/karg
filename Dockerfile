FROM node:lts AS build

WORKDIR /app

COPY ./ /app/

RUN npm install
RUN npm run build


FROM node:lts-alpine AS runtime

WORKDIR /app

COPY --from=build /app /app

EXPOSE 8080

CMD ["npm", "start"]
