FROM node:16-alpine
WORKDIR /app
COPY package.json package.json
RUN npm i
COPY . .
RUN npm run build
EXPOSE 3000
CMD npm run start
