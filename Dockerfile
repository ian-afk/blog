FROM node:20 AS build

# SETTING UP frontend environment variable - can change during build time
ARG VITE_BACKEND_URL=http://localhost:3001/api/v1

# working directory
WORKDIR /build
COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .

RUN npm run build

# above is build stage
# final state
FROM nginx AS final
WORKDIR /usr/share/nginx/html

# BUILT files
COPY --from=build /build/dist .
