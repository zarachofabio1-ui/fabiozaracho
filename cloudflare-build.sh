#!/usr/bin/env bash
set -euo pipefail
# Cloudflare Pages: build command bash cloudflare-build.sh; output directory .cloudflare-output
mkdir -p .cloudflare-output
git archive HEAD | tar -x -C .cloudflare-output
# Netlify's hostname-based rewrite is not supported by Pages _redirects.
# Recreate web.fabiozaracho.com routing separately before DNS cutover.
rm -f .cloudflare-output/_redirects .cloudflare-output/cloudflare-build.sh
# Required pages and assets must exist before deployment.
for file in index.html web/index.html 404.html images/perfil-principal.jpg _next/static/chunks/3pdzm2e_kfngi.css videos/cinematic-bg.mp4 audio/cinematic-ambient.mp3; do
  test -s ".cloudflare-output/$file" || { echo "Missing required asset: $file" >&2; exit 1; }
done
