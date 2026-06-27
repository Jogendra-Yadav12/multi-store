# ---- Base Image ----
FROM php:8.2-cli

# ---- System Dependencies ----
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    libpq-dev \
    libonig-dev \
    libxml2-dev \
    libpng-dev \
    && docker-php-ext-install pdo pdo_pgsql mbstring bcmath \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ---- Composer ----
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ---- Working Directory ----
WORKDIR /var/www

# ---- Copy Application ----
COPY . .

# ---- Install PHP Dependencies ----
RUN composer install --no-dev --optimize-autoloader

# ---- Cache Config & Routes (env vars set at runtime by Render) ----
# NOTE: We skip config:cache here because env vars aren't available at build time
RUN php artisan route:cache || true
RUN php artisan view:cache  || true

# ---- Fix Storage Permissions ----
RUN chmod -R 775 storage bootstrap/cache

# ---- Make shell scripts executable ----
RUN chmod +x start.sh render-build.sh

# ---- Expose Port ----
EXPOSE 8000

# ---- Start Command ----
CMD ["/bin/bash", "start.sh"]
