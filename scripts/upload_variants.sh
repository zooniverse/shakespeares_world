#!/bin/bash

if [ -z "$1" ]
then
  echo "Usage: ./upload_variants.sh dir"
  exit 1
fi

VARIANTS_PATH="$1"
DEPLOY_PATH="s3://zooniverse-static/www.shakespearesworld.org/variants/"
SYNC_CMD="aws s3 sync ${VARIANTS_PATH} ${DEPLOY_PATH}"
echo "running sync cmd: ${SYNC_CMD}"
${SYNC_CMD}
