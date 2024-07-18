#!/usr/bin/env bash

MARK='\033[0;30m[publish:cdn]\033[0m'

echo -e "${MARK} Removing old docs"
aws s3 rm --only-show-errors --recursive s3://docs.cogoport.io/maps
echo -e "${MARK} Uploading new docs"
aws s3 sync --only-show-errors --acl public-read ./out/ s3://docs.cogoport.io/maps/
