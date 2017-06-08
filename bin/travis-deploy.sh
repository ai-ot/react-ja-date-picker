#!/usr/bin/env bash

# deploy from Travis CI

set -e

if [[ "false" != "$TRAVIS_PULL_REQUEST" ]]; then
  echo "Not deploying pull requests."
  exit
fi

if [[ "master" != "$TRAVIS_BRANCH" ]]; then
  echo "Not on the 'master' branch."
  exit
fi

# build preview document
npm run build:preview

pushd demo
rm .gitignore
rm preview.jsx
rm vendor/.gitkeep

git init
git config user.name $GIT_USER
git config user.email $GIT_EMAIL

git add .
git commit --quiet -m "Deploy from Travis CI [no ci]"
git push origin master

popd
