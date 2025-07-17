FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --verbose && \
    mkdir -p /app/build && \
    ls -la /app/build

FROM nginx:alpine
RUN apk add --no-cache bash
RUN mkdir -p /usr/share/nginx/html && \
    mkdir -p /etc/nginx/templates

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.template.conf /etc/nginx/templates/default.conf.template

RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    ls -la /usr/share/nginx/html

EXPOSE 80

CMD ["sh", "-c", \
    "envsubst '${BACKEND_HOST}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && \
     nginx -g 'daemon off;'"]