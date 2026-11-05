#!/usr/bin/env bash
# Déploie Arame GP Group sur Netlify (site : arame-gp-group.netlify.app)
set -e
cd "$(dirname "$0")"
npm install
npx -y netlify-cli deploy --build --prod --site 97bf80d5-c4e2-4623-b626-84e4fecf87ce
