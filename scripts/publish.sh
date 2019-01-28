#!/bin/bash
if [ "$TRAVIS_PULL_REQUEST" != "false" ];
then npm run test
fi