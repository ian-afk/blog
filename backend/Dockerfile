FROM node:20
# WORKDIR like CD
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
CMD ["npm", "start"]