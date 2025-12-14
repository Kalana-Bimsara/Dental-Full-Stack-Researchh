#!/bin/sh
set -e

APP_PATH="/usr/share/nginx/html"
JS_PATH="$APP_PATH/assets"

echo "====================================="
echo " ENVIRONMENT VARIABLE VALUES"
echo "-------------------------------------"
echo "VITE_HOST=$VITE_HOST"
echo "VITE_BACKEND_PORT=$VITE_BACKEND_PORT"
echo "====================================="

echo ""
echo "JS files found:"
for f in "$JS_PATH"/*.js; do
  [ -f "$f" ] && echo "$f"
done
echo ""

replace_var() {
  VAR_NAME="$1"
  VAR_VALUE="$2"

  if [ -z "$VAR_VALUE" ]; then
    echo "WARN: $VAR_NAME is empty, skipping"
    return 0
  fi

  echo "Replacing __${VAR_NAME}__ with value"

  find "$APP_PATH" -name "*.js" -exec sed -i "s|__${VAR_NAME}__|${VAR_VALUE}|g" {} +
}

echo "========== REPLACING PLACEHOLDERS =========="

replace_var "VITE_HOST" "$VITE_HOST"
replace_var "VITE_BACKEND_PORT" "$VITE_BACKEND_PORT"

echo "============================================"

echo "Starting Nginx..."
exec "$@"
