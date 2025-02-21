FROM node:20-alpine

WORKDIR /app

COPY ./ /app/

RUN mkdir -p /app/.next/cache && chown nobody /app/.next/cache

USER nobody

EXPOSE 3000

CMD ["npm", "start"]
