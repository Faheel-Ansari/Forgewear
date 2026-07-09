FROM richarvey/nginx-php-fpm:3.1.6

# Install PHP bcmath extension needed by Hashids
RUN docker-php-ext-install bcmath

COPY . /var/www/html

# 1. Run composer install during build time so vendor folder is baked into the image
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Create the upload directories in case they were ignored by Git
RUN mkdir -p /var/www/html/public/uploads/mediaLibrary \
             /var/www/html/public/uploads/productImages \
             /var/www/html/public/uploads/userImages

# 2. Set the correct permissions for Laravel storage, cache, AND public upload directories
RUN chmod -R 777 /var/www/html/storage \
                 /var/www/html/bootstrap/cache \
                 /var/www/html/public/uploads

# Image config
# 3. Change SKIP_COMPOSER to 1 since we already ran it during build time
ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Laravel config
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1

EXPOSE 80

# Tells the container startup script to refresh settings at boot time
ENV ERRORS 1
ENV RUN_SCRIPTS 1

CMD ["/start.sh"]