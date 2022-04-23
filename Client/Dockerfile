# build environment
FROM node:17.5.0 as vue-build
WORKDIR /app
COPY ./ ./
RUN yarn install

ARG VUE_APP_API

ENV VUE_APP_API $VUE_APP_API
ENV NODE_OPTIONS --openssl-legacy-provider

RUN yarn build

# server environment
FROM nginx:alpine
COPY ./Nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=vue-build /app/dist /usr/share/nginx/html

ENV PORT 80
ENV HOST 0.0.0.0
ENV NODE_ENV=production
EXPOSE 80
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"