# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /react-app

# Copy the package.json and package-lock.json files to install dependencies
COPY package.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the application with nginx
FROM nginx:stable-alpine

# Copy the built files from the first stage to the nginx web root
COPY --from=build /react-app/build /usr/share/nginx/html

# Create the Nginx configuration directly in the Dockerfile
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
        try_files $uri /index.html; \
    } \
    \
    location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg|otf|webp)$ { \
        expires 6M; \
        access_log off; \
        add_header Cache-Control "public"; \
    } \
    \
    error_page 404 /index.html; \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80 to access the application
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
