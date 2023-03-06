#!/usr/bin/env bash

# Apply production release tags

# Abort if anything fails
set -e

TARGET="master"

# Show the tags we're going to apply
NOW=$(TZ=UTC date +"%Y-%m-%dT%H-%M-%S")
TAG="mparticle-v-$NOW"
echo
echo "Tagging ${TARGET} for release with tags:"
echo "${TAG}"

# Check the user wants to continue
echo
echo -n "Continue? [y/N] "
read -r
if [[ $REPLY =~ ^[Yy]$ ]]; then
  # Apply the tags
  git tag "${TAG}" "${TARGET}"
  if git push origin --tags; then
    echo
    echo "Done"
  else
    echo
    echo "Not authenticated, cleaning up and aborting..."
    git tag -d "${TAG}"
    echo
    echo "Aborted"
  fi
else
  # Let the user know we didn't touch anything!
  echo
  echo "Aborted"
fi