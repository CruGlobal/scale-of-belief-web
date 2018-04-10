#!/usr/bin/env bash

# Set PROJECT_NAME and ENVIRONMENT for testing/demo
export PROJECT_NAME=scale-of-belief-web
export ENVIRONMENT=staging

# Export environment variables
filename=$ECS_CONFIG/ecs/$PROJECT_NAME/env.$ENVIRONMENT
while read line; do
  if [[ "$line" != "" && ${line:0:1} != '#' ]]; then
    export "$line"
  fi
done < <(blackbox_cat "$filename")

set -x && \
    rm -rf build && \
    npm run build && \
    aws s3 sync build $S3_BUCKET --acl public-read --delete
