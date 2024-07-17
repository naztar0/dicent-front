FROM node as development

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:1.21.6-alpine as production

COPY --from=development /app/dist /var/www/html/
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/conf.d/ /etc/nginx/conf.d/
RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 80
