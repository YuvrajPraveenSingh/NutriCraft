# Use the official Nginx image
FROM nginx:latest

# Copy the HTML, CSS, and JS files to the Nginx web root directory
COPY index.html /usr/share/nginx/html/
COPY recipes.css /usr/share/nginx/html/
COPY recipes.js /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Command to start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
