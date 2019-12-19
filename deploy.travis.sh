#! /bin/bash
if [ "$TRAVIS_OS_NAME" == osx ]; then
    # deploy on mac
    npm install
    npm run build
    npm run release --mac
else
    # deploy on windows and linux
    docker run --rm -e GH_TOKEN -v "${PWD}":/project -v ~/.cache/electron:/root/.cache/electron -v ~/.cache/electron-builder:/root/.cache/electron-builder electronuserland/builder:wine /bin/bash -c "npm install && npm run build && npm run release --linux --win"
fi
