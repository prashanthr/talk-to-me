PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

if [ -z "$APP_ENV" ]; then
  APP_ENV="development"
fi

if [ -z "$APP_VERSION"]; then
  APP_VERSION=$PACKAGE_VERSION
fi

echo "APP_VERSION=$APP_VERSION APP_ENV=$APP_ENV yarn build"
APP_VERSION=$APP_VERSION APP_ENV=$APP_ENV yarn build
