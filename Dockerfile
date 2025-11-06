# Use stable Nginx Alpine base image
FROM nginx:stable-alpine

# Clean default web directory
RUN rm -rf /usr/share/nginx/html/*

# Copy your CodeXa-site content into Nginx web root
COPY . /usr/share/nginx/html

# Expose port 80 inside container (we'll map to 8082 on host)
EXPOSE 80

# Run Nginx in foregroundll
CMD ["nginx", "-g", "daemon off;"]
