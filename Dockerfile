FROM node:18
WORKDIR /app
COPY . .
EXPOSE 3000
RUN npm install
RUN npm run build
CMD npm run start

# FROM node:latest
# WORKDIR /var/www
# COPY package*.json .
# RUN npm install
# COPY . .
# RUN npm run build
