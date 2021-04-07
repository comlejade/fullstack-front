# build stage
FROM node:14.16.0 as build-stage

LABEL maintainer="thundersmile@126.com"

# 创建一个工作目录
WORKDIR /app

COPY . .

RUN yarn install --registry=https://registry.npm.taobao.org

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
