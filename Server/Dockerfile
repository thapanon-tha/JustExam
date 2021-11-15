FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . ./
EXPOSE 80
ENV TZ Asia/Bangkok
CMD if [ "${APP_ENV}" == "production" ]; \
    then \
    npm start; \
    else \
    npm run start; \
    fi
