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









# #!/bin/sh
# set -e

# APP_PATH="/usr/share/nginx/html"
# JS_PATH="$APP_PATH/assets"

# echo "====================================="
# echo " CONTAINER RUNTIME ENV VARIABLES"
# echo "-------------------------------------"
# echo "VITE_HOST=$VITE_HOST"
# echo "VITE_BACKEND_PORT=$VITE_BACKEND_PORT"
# echo "====================================="

# echo ""
# echo "JS files found:"
# for f in "$JS_PATH"/*.js; do
#   [ -f "$f" ] && echo " - $f"
# done
# echo ""

# print_placeholder_state() {
#   VAR_NAME="$1"
#   echo ""
#   echo "Checking placeholder: __${VAR_NAME}__"
#   COUNT=$(grep -r "__${VAR_NAME}__" "$APP_PATH" | wc -l || true)
#   echo "Occurrences found: $COUNT"
# }

# replace_var() {
#   VAR_NAME="$1"
#   VAR_VALUE="$2"

#   echo ""
#   echo "-------------------------------------"
#   echo "Processing variable: $VAR_NAME"
#   echo "Value: $VAR_VALUE"
#   echo "-------------------------------------"

#   if [ -z "$VAR_VALUE" ]; then
#     echo "WARN: $VAR_NAME is empty, skipping replacement"
#     return 0
#   fi

#   echo "Before replacement:"
#   print_placeholder_state "$VAR_NAME"

#   find "$APP_PATH" -name "*.js" -exec sed -i "s|__${VAR_NAME}__|${VAR_VALUE}|g" {} +

#   echo "After replacement:"
#   print_placeholder_state "$VAR_NAME"
# }

# echo ""
# echo "========== STARTING PLACEHOLDER REPLACEMENT =========="

# replace_var "VITE_HOST" "$VITE_HOST"
# replace_var "VITE_BACKEND_PORT" "$VITE_BACKEND_PORT"

# echo ""
# echo "========== FINAL VERIFICATION =========="

# echo "Searching for any remaining __VITE_ placeholders..."
# REMAINING=$(grep -r "__VITE_" "$APP_PATH" | wc -l || true)
# echo "Remaining placeholders count: $REMAINING"

# echo "============================================"
# echo "Starting Nginx..."
# echo "============================================"

# exec "$@"






