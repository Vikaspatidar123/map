#!/usr/bin/env bash

MARK='\033[0;30m[build]\033[0m'

echo -e "${MARK} Building maps"
NODE_ENV=production pnpm exec rollup -c rollup.config.js
