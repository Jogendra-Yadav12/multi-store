#!/bin/bash
set -e

echo "==> Running database migrations..."
php artisan migrate --force

echo "==> Starting Laravel server on port ${PORT:-8000}..."
php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
