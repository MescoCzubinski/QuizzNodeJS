FROM node:22.19-alpine as build

WORKDIR /app

COPY Frontend/package*.json ./
RUN npm install

COPY Frontend ./
RUN npm run build

FROM node:22.19-alpine

USER 0

WORKDIR /app

COPY Backend/package*.json ./
RUN npm install

COPY Backend ./
RUN npm run build

COPY --from=build /app/dist ./public

RUN chown -R Andrzej:Andrzej /app

USER 'Andrzej'

CMD ["node", "dist/server.js"]

