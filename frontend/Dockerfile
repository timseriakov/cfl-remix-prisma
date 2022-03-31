# Base Node image
FROM node:16.14-alpine3.14 as base

# Setup all node_modules
FROM base as deps

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./

RUN npm install --production=false

# Setup production node_modules
FROM base as production-deps

RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

COPY package.json package-lock.json ./

RUN npm prune --production

# Build the app
FROM base as build

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

ADD . .
#CMD ["npm", "run", "start"]

RUN npm run build

# Build production image
FROM base

ENV NODE_ENV=production
ENV PORT=80

RUN mkdir /app
WORKDIR /app

COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public

ADD . .

#EXPOSE 80

#CMD ["npm", "run", "start"]
