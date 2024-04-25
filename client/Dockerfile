# Use the official Nginx image
FROM nginx:latest


COPY . /usr/share/nginx/html/

EXPOSE 80

# Command to start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
