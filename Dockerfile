FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY . .
EXPOSE 8082
CMD ["nginx", "-g", "daemon off;"]
