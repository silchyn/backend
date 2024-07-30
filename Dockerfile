FROM node:20.15.1-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

COPY ./dist ./dist

CMD ["pnpm", "run", "start:dev"]
